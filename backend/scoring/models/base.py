from django.contrib.auth import get_user_model
from django.db import models

UserModel = get_user_model()


class BaseScore(models.Model):
    user = models.ForeignKey(to=UserModel, on_delete=models.CASCADE)
    total_score = models.IntegerField()
    max_score = models.IntegerField()
    date_scored = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date_scored']
        abstract = True

    def __str__(self):
        return f"{self.user} - Score: {self.total_score}/{self.max_score if self.max_score else ''} on {self.date_scored}"
