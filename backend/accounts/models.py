
from django.db import models
from django.contrib.auth import models as auth_models
from django.utils.translation import gettext_lazy as _
from .managers import AccountUserManager
from django.utils import timezone
from .choices import LevelChoices


class AccountUser(auth_models.AbstractBaseUser, auth_models.PermissionsMixin):
    email = models.EmailField(
        unique=True,
        error_messages={
            "unique": _("A user with that email already exists"),
        }
    )

    # I set that email is my username Field(going to be used instead of username)
    USERNAME_FIELD = "email"
    objects = AccountUserManager()

    is_staff = models.BooleanField(
        _("staff status"),
        default=False,
        help_text=_("Designates whether the user can log into this admin site."),
    )
    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_(
            "Designates whether this user should be treated as active. "
            "Unselect this instead of deleting accounts."
        ),
    )
    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)


class Profile(models.Model):
    """
    Here i store information that is going to be displayed on the frontend.
    """
    # I set OneToOneField with my User system
    user = models.OneToOneField(
        AccountUser,
        on_delete=models.CASCADE,
        primary_key=True
    )

    speaking_time = models.IntegerField(
        default=0
    )

    proficiency_level = models.CharField(
        choices=LevelChoices.choices,
        default=LevelChoices.A1,
    )

    completed_exercises = models.IntegerField(
        default=0,
        blank=True,
        null=True
    )

    # fluency_level = models.CharField()
    # grammar_level = models.CharField()
    # vocabulary_level = models.CharField()
    # pronuciation_level = models.CharField()
    # interaction_level = models.CharField()


    # badges_or_rewards = models.ManyToManyField()  Add later

    last_active_date = models.DateTimeField(
        auto_now=True,
    )

