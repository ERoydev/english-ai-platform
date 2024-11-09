from django.db import models



class SubtopicCategory(models.Model):
    subtopic = models.ForeignKey(to="questions.Subtopic", on_delete=models.CASCADE)
    category = models.ForeignKey(to="questions.Category", on_delete=models.CASCADE)

    class Meta:
        unique_together = ('subtopic', 'category')  # Ensures uniqueness in relationships