from django.contrib.auth import get_user_model
from django.db import models

UserModel = get_user_model()


class BaseScore(models.Model):
    user = models.OneToOneField(to=UserModel, on_delete=models.CASCADE)
    total_score = models.IntegerField(default=0)  # Accumulated total score
    last_score = models.IntegerField(default=0)  # Most recent attempt score
    attempts = models.IntegerField(default=0)  # Total number of attempts
    average_score = models.FloatField(default=0)  # Calculated average score

    # Timing and metadata
    last_attempt_date = models.DateTimeField(auto_now=True)  # Auto-updates to the most recent attempt date

    class Meta:
        abstract = True

