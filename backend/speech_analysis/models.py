from django.contrib.auth import get_user_model
from django.db import models

# Create your models here.

class SpeechAnalysis(models.Model):
    user = models.ForeignKey("accounts.AccountUser", on_delete=models.CASCADE)
    # Core Speech Metrics

    audio_duration = models.FloatField()  # Float for decimal duration
    word_count = models.FloatField()  # If word count can be a decimal (e.g., averaged)
    sentence_count = models.FloatField()

    vocab_score = models.FloatField()
    sentence_structure_score = models.FloatField()
    readability_score = models.FloatField()

    grammar_score = models.FloatField()
    total_score = models.FloatField()

    unique_words = models.FloatField()
    grade = models.CharField(max_length=10)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Speech Analysis for {self.user.email} on {self.created_at}"

    def get_total_score(self):
        return self.total_score