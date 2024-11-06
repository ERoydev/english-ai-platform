from django.contrib.auth import get_user_model
from django.db import models

UserModel = get_user_model()

class VocabularyProgress(models.Model):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)  # Total score for the session or cumulative
    date = models.DateTimeField(auto_now_add=True)  # When the score was recorded

    def __str__(self):
        return f"{self.user.email} - Score: {self.score} on {self.date}"