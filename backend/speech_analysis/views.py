import whisper
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .calculators.LanguageCalculatorFactory import LanguageCalculatorFactory
from .analyzer import analyze
from .mixins.TranscriptionMixin import TranscriptionMixin
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from pydub import AudioSegment
import io
from .models import SpeechAnalysis

# VERY IMPORTANT THIS IS THE LINE THAT LOADS THE MODEL SIZE FROM WHISPER
model = whisper.load_model("small")  # Load model globally to avoid reloading each time


@method_decorator(csrf_exempt, name='dispatch')
class AnalyzeAudioView(APIView, TranscriptionMixin):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # Check if 'audio' file and 'audio_duration' are provided in the request

        if 'audio' not in request.FILES:
            return JsonResponse({'error': 'Missing audio file'}, status=400)

        audio_file = request.FILES['audio']

        # Create a temporary file without auto-deletion
        try:
            audio = self._load_audio_file(audio_file)
            audio_duration = len(audio) / 1000.0  # Duration in seconds

            # Reset the file pointer before passing to transcribe_audio because .read() consumes the file.
            audio_file.seek(0)
            transcription, transcribed_audio = self.transcribe_audio(audio_file)

            # Apply additional analysis
            analysis_result = analyze(transcription)

            # Calculate English score
            language_calculator = LanguageCalculatorFactory.get_calculator('en', transcription, audio_duration, transcribed_audio)
            language_score = language_calculator.calculate_score()

            # self.upload_to_database(**analysis_result, **language_score, **{'audio_duration': audio_duration})

            return Response({
                'transcription': transcription,
                'analysis_result': analysis_result,
                'language_scores': language_score,
                'audio_duration': audio_duration,
            })

        except Exception as e:
            return Response({'error': 'Transcription failed', 'details': str(e)}, status=500)

    def upload_to_database(self, *args, **kwargs):
        """
            Upload analysis result to the database
        """
        data = {
            'user': self.request.user,  # Ensure this is a valid user instance
            'audio_duration': float(kwargs['audio_duration']),
            'word_count': float(kwargs['basic_text_analyzer']['word_count_analyzer']),
            'sentence_count': float(kwargs['basic_text_analyzer']['sentence_count_analyzer']),
            'vocab_score': float(kwargs['vocab_diversity_score']),
            'sentence_structure_score': float(kwargs['sentence_structure_score']),
            'readability_score': float(kwargs['readability_score']),
            'grammar_score': float(kwargs['grammar_score']),
            'total_score': float(kwargs['total_score']),
            'unique_words': float(kwargs['unique_words']),
            'grade': kwargs['grade']['grade'],
        }

        SpeechAnalysis.objects.create(**data)

    def _load_audio_file(self, audio_file):
        """
        Load audio file into a format that can be processed by Whisper
        Used to get my audio duration
        """
        try:
            # Convert the file to a byte stream and load it with pydub
            audio = AudioSegment.from_file(io.BytesIO(audio_file.read()))
            return audio
        except Exception as e:
            raise ValueError(f"Error loading audio file: {str(e)}")
