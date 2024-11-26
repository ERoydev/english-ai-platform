from django.db import models


class DifficultyChoices(models.TextChoices):
    EASY = '1', 'Easy'
    INTER = '2', 'Intermediate'
    HARD = '3', 'HARD'


class Question(models.Model):
    class Meta:
        abstract = True

    question_text = models.TextField()
    media_prompt = models.URLField(null=True, blank=True)  # YouTube or other media URLs

    difficulty = models.IntegerField(
        default=1),

    category = models.ForeignKey(to="questions.Category", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.category} - {self.question_text[:50]}"

    def is_correct_answer(self, user_answer):
        pass

    def check_answer(self, user_answer):
        pass