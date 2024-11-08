# questions/models/category.py
from django.db import models
from .section import Section

"""
Represents categories like "Fill the blank", "Context Writing" that are parts of a section
"""

# ManyToOne relation with Section model
class Category(models.Model):
    name = models.CharField(max_length=50)  # e.g., "Fill in the Blank", "Multiple Choice"
    section = models.ForeignKey(Section, on_delete=models.CASCADE, related_name="categories")
    description = models.TextField(blank=True, null=True)  # Optional: describe what this category involves

    class Meta:
        unique_together = ('name', 'section')  # Ensures unique categories within each section

    def __str__(self):
        return f"{self.section.name} - {self.name}"
