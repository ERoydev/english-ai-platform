# questions/models/category.py
from django.db import models
from .subtopics_category import SubtopicCategory

"""
Represents categories like "Fill the blank", "Context Writing" that are parts of a section
"""

# ManyToOne relation with Section model
class Category(models.Model):
    name = models.CharField(max_length=50)  # e.g., "Fill in the Blank", "Multiple Choice"
    description = models.TextField(blank=True, null=True)  # Optional: describe what this category involves
    subtopic = models.ManyToManyField(to="questions.Subtopic", through=SubtopicCategory, related_name="categories_for_subtopic")

    def __str__(self):
        return self.name