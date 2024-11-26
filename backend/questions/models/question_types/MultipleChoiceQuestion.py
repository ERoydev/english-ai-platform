from django.db import models
from ..base import Question


class MultipleChoiceQuestion(Question):
    choices = models.JSONField() # 4 Options to answer the question ["happy", "sad", "evil", "bad"]
    correct_answer = models.CharField(max_length=255)  # Correct answer example: "happy"

    # def is_correct_answer(self, user_answer):
    #     """Dispatch to the category-specific answer checker."""
    #     if self.category == self.CATEGORY:
    #         return self.check_answer(user_answer)
    #     else:
    #         raise ValueError("Unknown category")
    #
    # def check_answer(self, user_answer):
    #     return user_answer.strip().lower() == self.correct_answer.strip().lower()

