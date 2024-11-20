from django.conf import settings
import requests


class RequestToSpeechAnalysis:
    def handle_speech_analysis(self, audio):
        """
        Send speech data to the Speech Analysis Django app.
        :param audio: InMemoryUploadedFile or TemporaryUploadedFile from a file upload.
        """
        try:
            speech_url = settings.SPEECH_ANALYSIS_URL
            # Use the file-like object directly
            files = {
                'audio': (audio.name, audio, audio.content_type)
            }
            headers = {
                'Authorization': f'Token {self.request.user.auth_token}'
            }
            response = requests.post(speech_url, files=files, headers=headers)
            response.raise_for_status()  # Raise an exception for HTTP errors

            # Debug the response content
            print(f"Speech Analysis Response: {response.status_code}, {response.json()}")

            return response.json()
        except requests.RequestException as e:
            print(f"Error during speech analysis: {str(e)}")  # Log the error
            return {"error": f"Speech analysis failed: {str(e)}"}
