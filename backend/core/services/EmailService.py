from django.conf import settings
from django.core.mail import send_mail
from abc import ABC, abstractmethod


class EmailService(ABC):
    @staticmethod
    def _send_email(subject, message, recipients, sender=None):
        sender = sender or settings.EMAIL_HOST_USER
        send_mail(subject, message, recipients, sender, fail_silently=False)

    @staticmethod
    @abstractmethod
    def _prepare_email_data(data):
        pass


