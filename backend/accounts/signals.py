from django.contrib.auth import get_user_model
from django.db.models.signals import post_save

from .models import Profile
from django.dispatch import receiver

UserModel = get_user_model()


# post_save will trigger when UserModel.save() is called
@receiver(post_save, sender=UserModel)
def profile_create_on_registration(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

