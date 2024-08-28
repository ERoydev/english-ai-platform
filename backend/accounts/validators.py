import re
from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _


class AlphaNumericUpperValidator:
    def validate(self, password, user=None):
        if not re.search(r'[A-Za-z]', password):
            raise ValidationError(
                _("The password must contain at least one alphabetic character."),
                code='password_no_alpha',
            )
        if not re.search(r'[0-9]', password):
            raise ValidationError(
                _("The password must contain at least one numeric character."),
                code='password_no_number',
            )
        if not re.search(r'[A-Z]', password):
            raise ValidationError(
                _("The password must contain at least one uppercase letter."),
                code='password_no_uppercase',
            )

    def get_help_text(self):
        return _(
            "Your password must contain at least one alphabetic character, "
            "one numeric character, and one uppercase letter."
        )
