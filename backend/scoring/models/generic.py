from .base import BaseScore
from django.db import models


class GenericScore(BaseScore):
    max_score = models.IntegerField(default=0)    # Highest score in a single attempt

    # Additional fields for flexibility
    quiz_topic= models.CharField(max_length=50, null=True, blank=True)  # Type of quiz (optional)
    is_passed = models.BooleanField(default=False)  # Indicates if the user passed the quiz

    speaking_time = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"Scores for {self.user.email}"

