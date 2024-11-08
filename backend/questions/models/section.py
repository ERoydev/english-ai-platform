from django.db import models

"""
Represents "Vocabulary", "Grammar", "Speaking", "IELTS" as sections
"""

# OneToMany with Category model
class Section(models.Model):
    name = models.CharField(max_length=50, unique=True)  # e.g., "Vocabulary", "Grammar", "Speaking"
    description = models.TextField(blank=True, null=True)  # Optional: describe what this section covers

    def __str__(self):
        return self.name