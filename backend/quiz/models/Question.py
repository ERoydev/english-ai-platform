from django.db import models


class Question(models.Model):
    CATEGORY_CHOICES = [
        ('MCQ', 'Multiple Choice'),
        ('FILL', 'Fill in the Blank'),
        ('MATCH', 'Synonym/Antonym Matching'),
        ('COMPLETE', 'Sentence Completion'),
        ('WRITING', 'Writing'),
        ('OPENWRITING', ' Open-Ended Writing')
        # New categories should be added here if needed to
    ]

    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    question_text = models.TextField()
    choices = models.JSONField(null=True, blank=True)
    answer = models.CharField(max_length=255)
    difficulty = models.IntegerField(default=1)
    last_served_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.category} - {self.question_text[:50]}"
