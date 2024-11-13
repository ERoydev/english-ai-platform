from .base import BaseScore
from django.db import models


class GenericScore(BaseScore):
    speech_analysis = models.ForeignKey(to="speech_analysis.SpeechAnalysis", on_delete=models.SET_NULL, null=True, blank=True)
    time_duration = models.TimeField(null=True, blank=True)
