from django.contrib.auth import get_user_model
from django.db import models

UserModel = get_user_model()

# Handles Vocabulary related Questions following this specific needs

class VocabularyCategoryChoices(models.TextChoices):
    MCQ = 'MCQ', 'Multiple Choice'
    FILL = 'FILL', 'Fill in the Blank'
    MATCH = 'MATCH', 'Synonym/Antonym Matching'
    COMPLETE = 'COMPLETE', 'Sentence Completion'

class VocabQuestion(models.Model):

    category = models.CharField(max_length=20, choices=VocabularyCategoryChoices)
    question_text = models.TextField()  # The main question or prompt
    choices = models.JSONField(null=True, blank=True)
    answer = models.CharField(max_length=255)  # The correct answer (single word/phrase for vocab)
    difficulty = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.category} - {self.question_text[:50]}"

    def is_correct_answer(self, user_answer):
        """Dispatch to the category-specific answer checker."""
        if self.category == 'MCQ':
            return self._is_mcq_correct(user_answer)
        elif self.category == 'FILL':
            return self._is_fill_blank_correct(user_answer)
        elif self.category == 'MATCH':
            return self._is_matching_correct(user_answer)
        elif self.category == 'COMPLETE':
            return self._is_sentence_complete_correct(user_answer)
        else:
            raise ValueError("Unknown category")

    def _is_mcq_correct(self, user_answer):
        return user_answer.strip().lower() == self.answer.strip().lower()

    def _is_fill_blank_correct(self, user_answer):
        return user_answer.strip().lower() == self.answer.strip().lower()

