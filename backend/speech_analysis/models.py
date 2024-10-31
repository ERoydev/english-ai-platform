from django.contrib.auth import get_user_model
from django.db import models

# Create your models here.

class SpeechAnalysis(models.Model):
    user = models.ForeignKey("accounts.AccountUser", on_delete=models.CASCADE)

    # Core Speech Metrics
    duration = models.FloatField()  # Length of spoken input in seconds
    word_count = models.IntegerField()  # Total word count in transcribed text
    disfluencies_count = models.IntegerField(null=True, blank=True)  # "uh," "um," etc.

    # Text Analysis Results
    keywords_count = models.IntegerField(null=True, blank=True)  # Count of key terms
    grammar_score = models.FloatField(null=True, blank=True)  # Overall grammar correctness score
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Speech Analysis for {self.user.email} on {self.created_at}"