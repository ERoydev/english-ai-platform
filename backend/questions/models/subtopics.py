from django.db import models
from .section import Section

class Subtopic(models.Model):
    name = models.CharField(unique=True, max_length=100)
    image_url = models.URLField(max_length=200, blank=True, null=True)  # New field for image URL
    section = models.ForeignKey(to=Section, on_delete=models.CASCADE)
    categories = models.ManyToManyField(to="questions.Category", through="questions.SubtopicCategory", related_name="subtopics")

    def __str__(self):
        return self.name