
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

    first_name = models.CharField(max_length=30, null=True, blank=True)
    last_name = models.CharField(max_length=30, null=True, blank=True)
    age = models.IntegerField(null=True, blank=True)
    phone_number = models.CharField(max_length=15, null=True, blank=True)

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

    fluency_level = models.JSONField(null=True, blank=True)
    grammar_level = models.JSONField(null=True, blank=True)
    vocabulary_level = models.JSONField(null=True, blank=True)
    pronunciation_level = models.JSONField(null=True, blank=True)


    # badges_or_rewards = models.ManyToManyField()  Add later

    last_active_date = models.DateTimeField(
        auto_now=True,
    )

    @staticmethod
    def update_profile_levels(profile, language_scores):
        field_map = {
            'fluency_level': 'fluency_stats',
            'grammar_level': 'grammar_stats',
            'vocabulary_level': 'vocabulary_stats',
            'pronunciation_level': 'pronunciation_stats'
        }

        for field, score_key in field_map.items():
            if not language_scores[score_key]:
                # If its unrecognized English language the structure will be just None -> Check ScoreResultInterface
                continue
            history = getattr(profile, field) or []
            history.append(language_scores[score_key]['level']['score'])
            setattr(profile, field, history[-10:])  # Keep only the last 10

    @staticmethod
    def update_profile_speaking_time(profile, audio_duration):
        profile.speaking_time += audio_duration
        profile.save()