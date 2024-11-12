# questions/models/category.py
from django.db import models
from .subtopics_category import SubtopicCategory
from .question_types.MultipleChoiceQuestion import MultipleChoiceQuestion
from .question_types.OpenEndedQuestion import OpenEndedQuestion
from django.contrib.contenttypes.models import ContentType

"""
Represents categories like "Fill the blank", "Context Writing" that are parts of a section
"""

# ManyToOne relation with Section model
class Category(models.Model):
    DEFAULT_LIMIT = 7 # Limit of questions that are going to be received

    name = models.CharField(max_length=50)  # e.g., "Fill in the Blank", "Multiple Choice"
    description = models.TextField(blank=True, null=True)  # Optional: describe what this category involves
    subtopic = models.ManyToManyField(to="questions.Subtopic", through=SubtopicCategory, related_name="categories_for_subtopic")

    def get_all_questions_for_category(self, LIMIT=DEFAULT_LIMIT):
        """Get dynamically all related questions for this category from all the question_types models"""
        all_questions = []

        # Iterate over all related fields
        for related_object in self._meta.related_objects:
            # Check if the related field is a reverse ForeignKey relationship
            if related_object.related_model._meta.model_name.endswith('question'):
                # Dynamically get the related questions queryset using `getattr`
                related_name = f"{related_object.related_model._meta.model_name}_set"

                # This query handles the limit of questions and randomization of choice
                questions = getattr(self, related_name).all().order_by("?")[:LIMIT]
                all_questions.extend(questions)

        return all_questions

    def __str__(self):
        return self.name