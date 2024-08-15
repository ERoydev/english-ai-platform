
from django.db import models
from django.contrib.auth import models as auth_models
from django.utils.translation import gettext_lazy as _
from .managers import AccountUserManager
from django.utils import timezone



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
    Here i store personal information about AccountUser.
    """

    # I set OneToOneField with my User system
    user = models.OneToOneField(
        AccountUser,
        on_delete=models.CASCADE,
        primary_key=True
    )