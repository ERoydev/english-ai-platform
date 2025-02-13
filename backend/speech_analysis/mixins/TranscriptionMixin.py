import tempfile
import os

# Load Faster Whisper model (force CPU mode to avoid CUDA errors)
# This is the smallest possible model & optimize memory
model = None
def get_model():
    # lazy loading
    global model
    if model is None:
        from faster_whisper import WhisperModel
        # Load Faster Whisper model (force CPU mode to avoid CUDA errors)
        # This is the smallest possible model & optimize memory
        model = WhisperModel("tiny", device="cpu", compute_type="int8")  # Use "cpu" to avoid CUDA errors

    return model


class TranscriptionMixin:
    def transcribe_audio(self, audio_file):
        """Handles saving, transcribing, and cleaning up the audio file using Faster Whisper."""
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_audio_file:
            temp_audio_file.write(audio_file.read())
            temp_audio_file.flush()  # Ensure all data is written

        # Close the file to release it before processing
        temp_audio_file_path = temp_audio_file.name
        os.chmod(temp_audio_file_path, 0o644)  # Set read permissions

        try:
            # Transcribe using Faster Whisper
            model = get_model()
            segments, info = model.transcribe(temp_audio_file_path)

            # Extract transcribed text
            transcription_text = " ".join([segment.text for segment in segments])

            # Reformat result to match old Whisper output
            result = {
                "text": transcription_text,
                "segments": [  # Add segment details like Whisper does
                    {
                        "start": segment.start,
                        "end": segment.end,
                        "text": segment.text
                    }
                    for segment in segments
                ],
                "language": info.language
            }

            return transcription_text, result  # Keep same return format
        finally:
            # Cleanup the temporary file after transcription
            os.remove(temp_audio_file_path)




# Thats the old approach using whisper pip install openai-whisper
# model = whisper.load_model("small")  # Load model globally to avoid reloading each time
#
#
# class TranscriptionMixin:
#     def transcribe_audio(self, audio_file):
#         """Handles saving, transcribing, and cleaning up the audio file."""
#         with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_audio_file:
#             temp_audio_file.write(audio_file.read())
#             temp_audio_file.flush()  # Ensure all data is written
#
#         # Close the file to release it before processing
#         temp_audio_file_path = temp_audio_file.name
#         os.chmod(temp_audio_file_path, 0o644)  # Set read permissions
#
#         try:
#             # Pass the path to the transcription model
#             result = model.transcribe(temp_audio_file_path)
#             return result["text"], result
#         finally:
#             # Cleanup the temporary file after transcription
#             os.remove(temp_audio_file_path)