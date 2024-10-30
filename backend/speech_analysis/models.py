from django.contrib.auth import get_user_model
from django.db import models

# Create your models here.

class TextAnalysis(models.Model):
    user = models.ForeignKey(to="accounts.AccountUser", on_delete=models.CASCADE)
    word_count = models.IntegerField()

    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"Text Analysis for {self.user.email} at {self.created_at}"