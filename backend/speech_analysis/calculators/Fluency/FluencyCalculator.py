from ...helpers.TextHelper import TextHelper
from ...mixins.ScoringMixin import ScoringMixin

class FluencyCalculator(ScoringMixin):

    def calculate_fluency(self, text, audio_duration):
        """
        Analyze fluency and determine CEFR level.

        I could move this in seperated class if i need to expand logic
        """
        if not text:
            return {'error': 'No transcription text available'}

        # Get the transcription text
        transcript_text = text

        # Calculate word count
        words = transcript_text.split()
        total_words = TextHelper.get_len_of_words(words)

        # Calculate Words Per Second (WPS)
        min_audio_duration = max(audio_duration, 1.0)  # Minimum duration of 1 second
        words_per_second = total_words / min_audio_duration

        # Calculate fluency score
        typical_wps_min, typical_wps_max = 2, 3  # Typical conversational range
        if words_per_second < typical_wps_min:
            fluency_score = max(0, 50 * (words_per_second / typical_wps_min))
        elif words_per_second > typical_wps_max:
            fluency_score = max(0, 100 - 50 * (words_per_second - typical_wps_max))
        else:
            fluency_score = 100

        fluency_score = round(fluency_score, 2)

        # Calculate speech density
        # Speech density is words per second relative to typical maximum WPS
        speech_density = min(1.0, words_per_second / typical_wps_max)
        speech_density = round(speech_density, 2)

        # Map fluency score to CEFR level
        fluency_level = self.get_fluency_level(fluency_score)

        return {
            'level': {'score': fluency_level, 'description': 'Level for fluency'},
            'score': {'score': self.get_score(fluency_level), 'description': 'Words per second'},
            'words_per_second': {'score': round(words_per_second, 2), 'description': 'Count of words per second'},
            'speech_density': {'score': speech_density, 'description': 'Ratio of meaningful words to total audio duration'}
        }

    @staticmethod
    def get_fluency_level(fluency_score):
        """
        Map fluency score to CEFR level.
        """
        if fluency_score <= 30:
            return "A1"
        elif 31 <= fluency_score <= 50:
            return "A2"
        elif 51 <= fluency_score <= 70:
            return "B1"
        elif 71 <= fluency_score <= 85:
            return "B2"
        elif 86 <= fluency_score <= 95:
            return "C1"
        else:  # 96-100
            return "C2"
