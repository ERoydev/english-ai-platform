from django.db import models

# Create your models here.


class Testimonials(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    role = models.CharField(max_length=100)
    rating = models.DecimalField(max_digits=3, decimal_places=1)
    text = models.TextField()

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.role}"

