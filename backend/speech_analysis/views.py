from django.http import JsonResponse
import whisper
from django.utils.decorators import method_decorator
from .calculators.calculate_english_score import LanguageCalculatorFactory
from django.views.decorators.csrf import csrf_exempt
from .analyzer import analyze
from django.views import View
from .mixins.TranscriptionMixin import TranscriptionMixin
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import SpeechAnalysis

model = whisper.load_model("base")  # Load model globally to avoid reloading each time


@method_decorator(csrf_exempt, name='dispatch')
class AnalyzeAudioView(APIView, TranscriptionMixin):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # Check if 'audio' file and 'audio_duration' are provided in the request
        if 'audio' not in request.FILES or 'audio_duration' not in request.POST:
            return JsonResponse({'error': 'Missing audio file or duration'}, status=400)

        audio_file = request.FILES['audio']
        audio_duration = request.POST['audio_duration']  # duration for the audio file

        # Create a temporary file without auto-deletion
        try:
            transcription = self.transcribe_audio(audio_file)
            # Apply additional analysis
            analysis_result = analyze(transcription)
            # Calculate English score
            language_calculator = LanguageCalculatorFactory.get_calculator('en', transcription)
            language_score = language_calculator.calculate_score()

            self.upload_to_database(**analysis_result, **language_score, **{'audio_duration': audio_duration})

            return JsonResponse({
                'transcription': transcription,
                'analysis_result': analysis_result,
                'language_scores': language_score,
                'audio_duration': audio_duration,
            })

        except Exception as e:
            return JsonResponse({'error': 'Transcription failed', 'details': str(e)}, status=500)

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