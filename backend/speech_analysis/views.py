import os

from django.http import JsonResponse
import whisper
import tempfile

from django.utils.decorators import method_decorator

from .calculators.calculate_english_score import LanguageCalculatorFactory

from django.views.decorators.csrf import csrf_exempt
from .analyzer import analyze
from django.views import View

model = whisper.load_model("base")  # Load model globally to avoid reloading each time

@method_decorator(csrf_exempt, name='dispatch')
class AnalyzeAudioView(View):
    def post(self, request, *args, **kwargs):
        # Check if 'audio' file and 'audio_duration' are provided in the request
        if 'audio' not in request.FILES or 'audio_duration' not in request.POST:
            return JsonResponse({'error': 'Missing audio file or duration'}, status=400)

        audio_file = request.FILES['audio']
        audio_duration = request.POST['audio_duration']  # duration for the audio file

        # Create a temporary file without auto-deletion
        temp_audio_file = tempfile.NamedTemporaryFile(delete=False, suffix=".wav")
        try:
            temp_audio_file.write(audio_file.read())
            temp_audio_file.flush()  # Ensure all data is written
            temp_audio_file.close()  # Close it to release the file for reading

            # Transcribe the saved audio file
            result = model.transcribe(temp_audio_file.name)
            transcription = result["text"]

            # Calculate English score
            language_calculator = LanguageCalculatorFactory.get_calculator('en', transcription)
            language_score = language_calculator.calculate_score()

            # Apply additional analysis
            analysis_result = analyze(transcription)

            # Clean up the temporary audio file
            os.remove(temp_audio_file.name)

            return JsonResponse({
                'transcription': transcription,
                'analysis_result': analysis_result,
                'language_scores': language_score,
                'audio_duration': audio_duration,
            })

        except Exception as e:
            # Clean up the file in case of error
            if os.path.exists(temp_audio_file.name):
                os.remove(temp_audio_file.name)
            return JsonResponse({'error': 'Transcription failed', 'details': str(e)}, status=500)
