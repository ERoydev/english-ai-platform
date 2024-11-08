
from django.contrib.auth.models import User
from django.db import models


class GrammarQuestion(models.Model):
    QUESTION_TYPES = [
        ('GRAMMAR_PROMPT', 'Grammar Prompt'),  # For quick grammar question
        ('SCENARIO', 'Scenario'),  # Role-play scenarios
        ('ERROR_CORRECTION', 'Error Correction'),  # Error spotting and correction
        ('VOCABULARY', 'Vocabulary'),  # Vocabulary-focused
        ('INSTRUCTION', 'Instructional'),  # Sequential or instructional speaking
        ('HYPOTHETICAL', 'Hypothetical')  # Hypothetical/conditional scenarios
    ]

    question_text = models.TextField()  # Text of the question or prompt
    category = models.CharField(max_length=20, choices=QUESTION_TYPES)
    grammar_focus = models.CharField(max_length=50, blank=True, null=True)  # Optional: e.g., "past tense"
    correct_answer = models.CharField(max_length=255, blank=True, null=True)  # Expected answer for certain exercises
    follow_up_question = models.TextField(blank=True, null=True)  # Additional question, e.g., "What tense?"

    def __str__(self):
        return f"{self.category} - {self.question_text[:50]}"