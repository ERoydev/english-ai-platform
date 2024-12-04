from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .mixins.ScoringMixin import ScoringMixin
from .models.ScoringInterface import ScoringInterface
import json
from .mixins.RequestToSpeechAnalysis import RequestToSpeechAnalysis

from accounts.models import Profile


class ScoringView(APIView, ScoringMixin, RequestToSpeechAnalysis):
    def post(self, request, *args, **kwargs):
        answers_json = request.data.get('answers')
        time_duration = request.data.get('time')
        audio = request.data.get('audio')
        is_quiz: bool = request.data.get('is_quiz')

        scores = {} # hold score results

        # Handles if user had exercise with speaking
        if audio:
            speech_result = self.handle_speech_analysis(audio)
            scores['speech_scores'] = speech_result

        # Handles when user has answered quiz questions
        if answers_json and is_quiz == 'true':
            answers = json.loads(answers_json)
            score_result = self.calculate_score(answers)
            scoring = ScoringInterface(self.request.user, score_result['total_score'], score_result['max_score'], time_duration, score_result['correct_answers'], score_result['incorrect_answers'])
            quiz_scores = scoring.to_dict()
            scores['quiz_scores'] = quiz_scores

        profile = get_object_or_404(Profile, pk=self.request.user.pk)
        profile.completed_exercises += 1
        profile.save()

        return Response(
            scores,
            status=status.HTTP_200_OK
        )

    def get(self, request, *args, **kwargs):
        pass

