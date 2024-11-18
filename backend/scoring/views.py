from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .mixins.ScoringMixin import ScoringMixin
from .models.generic import GenericScore
from .serializers import GenericScoreSerializer
from .models.ScoringInterface import ScoringInterface


class ScoringView(APIView, ScoringMixin):
    def post(self, request, *args, **kwargs):
        answers = request.data.get('answers')
        time_duration = request.data.get('time')

        score_result = self.calculate_score(answers)

        scoring = ScoringInterface(self.request.user, score_result['total_score'], score_result['max_score'], time_duration, score_result['correct_answers'],
                                   score_result['incorrect_answers'])

        return Response(
            scoring.to_dict(),
            status=status.HTTP_200_OK
        )

    def get(self, request, *args, **kwargs):
        pass

