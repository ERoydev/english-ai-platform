
from .EmailService import EmailService


class ContactService(EmailService):

    def __init__(self, data):
        self.data = data

    def _prepare_email_data(self, data):
        pass
