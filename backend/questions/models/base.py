from django.db import models


class BaseQuestion(models.Model):
    section = models.CharField(max_length=50)  # High-level category (e.g., "Vocabulary", "IELTS")
    category = models.CharField(max_length=50)  # Specific type (e.g., "Multiple Choice", "Fill in the Blank")
    difficulty = models.IntegerField(default=1)  # Common field for difficulty level
    question_text = models.TextField(null=True, blank=True)  # Optional, depending on the question type

    class Meta:
        abstract = True  # This makes it an abstract model

    def __str__(self):
        return f"{self.section} - {self.category}: {self.question_text[:50] if self.question_text else 'No Text'}"