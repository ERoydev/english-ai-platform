from django.apps import apps
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .mixins.ScoringMixin import ScoringMixin

from .models.generic import GenericScore
from .serializers import GenericScoreSerializer

class ScoringView(APIView, ScoringMixin):
    def post(self, request, *args, **kwargs):
        answers = request.data.get('answers')
        time_duration = request.data.get('time')

        total_score, max_score = self.calculate_score(answers)

        generic_score = GenericScore.objects.create(
            user=request.user,
            total_score=total_score,
            max_score=max_score,
            time_duration=time_duration
        )


        serializer = GenericScoreSerializer(generic_score)
        return Response(serializer.data)

    def get(self, request, *args, **kwargs):
        pass

