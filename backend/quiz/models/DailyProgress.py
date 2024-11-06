from django.contrib.auth import get_user_model
from django.db import models
from django.utils import timezone


UserModel = get_user_model()

class DailyProgress(models.Model):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    date = models.DateField(default=timezone.now)

    # Fields for each test's completion and score
    multiple_choice_questions_completed = models.BooleanField(default=False)
    multiple_choice_questions_score = models.IntegerField(default=0)

    fill_the_blank_completed = models.BooleanField(default=False)
    fill_the_blank_score = models.IntegerField(default=0)

    match_completed = models.BooleanField(default=False)
    match_score = models.IntegerField(default=0)

    sentence_completion_completed = models.BooleanField(default=False)
    sentence_completion_score = models.IntegerField(default=0)

    writing_completed = models.BooleanField(default=False)
    writing_score = models.IntegerField(default=0)

    open_writing_completed = models.BooleanField(default=False)
    open_writing_score = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user.email} - {self.date} - Score: {self.score}"

    class Meta:
        unique_together = ('user', 'date')  # Ensures one record per user per day
