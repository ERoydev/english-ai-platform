from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .mixins.ScoringMixin import ScoringMixin
from .models.ScoringInterface import ScoringInterface
import json
from django.conf import settings
import requests


class ScoringView(APIView, ScoringMixin):
    def post(self, request, *args, **kwargs):
        answers_json = request.data.get('answers')
        time_duration = request.data.get('time')
        audio = request.data.get('audio')
        is_quiz: bool = request.data.get('is_quiz')
        scores = {}

        if audio:
            speech_result = self.handle_speech_analysis(audio)
            scores['speech_scores'] = speech_result

        if answers_json and is_quiz == 'true':
            answers = json.loads(answers_json)
            score_result = self.calculate_score(answers)
            scoring = ScoringInterface(self.request.user, score_result['total_score'], score_result['max_score'], time_duration, score_result['correct_answers'], score_result['incorrect_answers'])
            quiz_scores = scoring.to_dict()
            scores['quiz_scores'] = quiz_scores

        return Response(
            scores,
            status=status.HTTP_200_OK
        )

    def get(self, request, *args, **kwargs):
        pass

    def handle_speech_analysis(self, audio):
        """
        Send speech data to the Speech Analysis Django app.
        :param audio: InMemoryUploadedFile or TemporaryUploadedFile from a file upload.
        """
        try:
            speech_url = settings.SPEECH_ANALYSIS_URL
            # Use the file-like object directly
            files = {
                'audio': (audio.name, audio, audio.content_type)
            }
            headers = {
                'Authorization': f'Token {self.request.user.auth_token}'
            }
            response = requests.post(speech_url, files=files, headers=headers)
            response.raise_for_status()  # Raise an exception for HTTP errors

            # Debug the response content
            print(f"Speech Analysis Response: {response.status_code}, {response.json()}")

            return response.json()
        except requests.RequestException as e:
            print(f"Error during speech analysis: {str(e)}")  # Log the error
            return {"error": f"Speech analysis failed: {str(e)}"}
