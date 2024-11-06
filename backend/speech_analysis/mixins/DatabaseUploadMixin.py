from ..models import SpeechAnalysis


class DatabaseUploadMixin:
    def upload_to_database(self, **data):
        """Handles data upload to the database."""
        # Example: Speech.objects.create(**data) assuming `data` contains required fields
        SpeechAnalysis.objects.create(**data)
