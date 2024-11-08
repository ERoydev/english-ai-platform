from django.contrib.auth import get_user_model
from django.db import models
from django.utils import timezone


UserModel = get_user_model()

class ExerciseScore(models.Model):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    category = models.CharField(max_length=50)  # e.g., Vocabulary, Grammar, etc.
    total_questions = models.IntegerField()
    correct_answers = models.IntegerField()
    score = models.IntegerField()
    completed_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.category} - Score: {self.score}"