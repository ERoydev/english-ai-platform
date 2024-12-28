from django.http import JsonResponse
from django.shortcuts import get_object_or_404
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
import logging

from accounts.models import Profile

# This loads whisper model in instance called `model`
from .whisper_lang_loader import model


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

            profile = get_object_or_404(Profile, pk=self.request.user.pk)
            self.update_profile_speaking_time(profile, audio_duration)
            self.update_profile_levels(profile, language_score)

            return Response({
                'transcription': transcription,
                'analysis_result': analysis_result,
                'language_scores': language_score,
                'audio_duration': audio_duration,
            })

        except Exception as e:
            logging.error(f'Error {e}')
            return Response({'error': 'Transcription failed', 'details': str(e)}, status=500)

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

    def update_profile_levels(self, profile, language_scores):
        field_map = {
            'fluency_level': 'fluency_stats',
            'grammar_level': 'grammar_stats',
            'vocabulary_level': 'vocabulary_stats',
            'pronunciation_level': 'pronunciation_stats'
        }

        for field, score_key in field_map.items():
            if not language_scores[score_key]:
                # If its unrecognized English language the structure will be just None -> Check ScoreResultInterface
                continue
            history = getattr(profile, field) or []
            history.append(language_scores[score_key]['level']['score'])
            setattr(profile, field, history[-10:])  # Keep only the last 10

        # Save the profile after all updates
        overall_level = self.calculate_combined_level(profile)
        profile.proficiency_level = overall_level
        profile.save()

    def update_profile_speaking_time(self, profile, audio_duration):
        profile.speaking_time += audio_duration
        profile.save()

    @staticmethod
    def calculate_combined_level(profile):
        # Mapping of levels to numeric values
        level_mapping = {'A1': 1, 'A2': 2, 'B1': 3, 'B2': 4, 'C1': 5, 'C2': 6}
        reverse_mapping = {v: k for k, v in level_mapping.items()}

        # Get all fields and calculate averages
        fields = ['fluency_level', 'grammar_level', 'vocabulary_level', 'pronunciation_level']
        field_averages = []

        for field in fields:
            history = getattr(profile, field, [])  # Get the last 10 levels for the field
            numeric_levels = []

            numeric_levels = [level_mapping[level] for level in history if level in level_mapping]

            if numeric_levels:  # Avoid division by zero
                average = sum(numeric_levels) / len(numeric_levels)
                field_averages.append(average)

        # Calculate the overall average of all field averages
        if field_averages:  # Avoid division by zero
            overall_average = sum(field_averages) / len(field_averages)
            overall_level = reverse_mapping[round(overall_average)]
        else:
            overall_level = None  # No valid levels to calculate from

        return overall_level
