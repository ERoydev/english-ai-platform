import os
from django.http import JsonResponse
import whisper
import tempfile

from django.views.decorators.csrf import csrf_exempt
from .analyzer import analyze

model = whisper.load_model("base")  # Load model globally to avoid reloading each time

@csrf_exempt
def analyze_audio(request):
    if request.method == 'POST' and request.FILES.get('audio'):
        audio_file = request.FILES['audio']

        # Create a temporary file without auto-deletion
        temp_audio_file = tempfile.NamedTemporaryFile(delete=False, suffix=".wav")
        try:
            temp_audio_file.write(audio_file.read())
            temp_audio_file.flush()  # Ensure all data is written
            temp_audio_file.close()  # Close it to release the file for reading

            # Now try transcribing this saved file
            result = model.transcribe(temp_audio_file.name)
            transcription = result["text"]

            # Delete the file manually after transcription
            os.remove(temp_audio_file.name)

            # Apply analysis
            analysis_result = analyze(transcription)

            return JsonResponse({'analysis_result': analysis_result})
        except Exception as e:
            # Clean up the file in case of error
            if os.path.exists(temp_audio_file.name):
                os.remove(temp_audio_file.name)
            return JsonResponse({'error': 'Transcript   ion failed', 'details': str(e)}, status=500)
