import tempfile
import whisper
import os

model = whisper.load_model("base")  # Load model globally to avoid reloading each time


class TranscriptionMixin:
    def transcribe_audio(self, audio_file):
        """Handles saving, transcribing, and cleaning up the audio file."""
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_audio_file:
            temp_audio_file.write(audio_file.read())
            temp_audio_file.flush()  # Ensure all data is written

        # Close the file to release it before processing
        temp_audio_file_path = temp_audio_file.name
        os.chmod(temp_audio_file_path, 0o644)  # Set read permissions

        try:
            # Pass the path to the transcription model
            result = model.transcribe(temp_audio_file_path)
            return result["text"], result
        finally:
            # Cleanup the temporary file after transcription
            os.remove(temp_audio_file_path)