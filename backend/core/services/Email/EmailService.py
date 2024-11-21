from django.conf import settings
from django.core.mail import send_mail
from abc import ABC, abstractmethod


class EmailService(ABC):

    @staticmethod
    @abstractmethod
    def send_email(subject, message, receiver, sender=None):
        # If sender not passed i will be the sender
        sender = sender or settings.EMAIL_HOST_USER

        send_mail(subject, message, sender, [receiver], fail_silently=False)

    @staticmethod
    @abstractmethod
    def _prepare_email_data(data):
        pass
