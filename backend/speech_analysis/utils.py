from pydub import AudioSegment
import io


"""
I use this in order to calculate duration of the audio
"""

def load_audio_file(audio_file):
    """
    Load audio file into a format that can be processed by Whisper
    Used to get my audio duration
    """
    try:
        # Convert the file to a byte stream and load it with pydub
        audio = AudioSegment.from_file(io.BytesIO(audio_file.read()))
        return audio
    except Exception as e:
        raise ValueError(f"Error loading audio file: {str(e)}")