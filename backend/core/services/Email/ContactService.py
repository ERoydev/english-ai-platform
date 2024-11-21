from backend.core.services.Email.EmailService import EmailService
from django.conf import settings

class ContactService(EmailService):
    SUBJECT_TEXT = 'Contact Form Message'

    def __init__(self, data):
        self.data = data
        self.subject = None
        self.message = None
        self.receiver = None
        self._prepare_email_data()

    def _prepare_email_data(self):
        """
            Extract user information and returns subject of email and message
        """
        first_name = self.data.get('firstName')
        last_name = self.data.get('lastName')
        phone = self.data.get('phone')
        email = self.data.get('email')
        message_text = self.data.get('message')

        self.receiver = settings.EMAIL_HOST_USER
        self.subject = self.SUBJECT_TEXT
        self.message = (
            f"Message from {first_name} {last_name}\n"
            f"Phone Number: {phone}\n"
            f"Email: {email}\n\n"
            f"Message:\n{message_text}"
        )

    def send_email(self, subject, message, receiver, sender=None):
        super().send_email(self.subject, self.message, self.receiver, sender)
