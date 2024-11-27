import textstat
from langdetect import detect
from .BaseLanguageCalculator import BaseLanguageCalculator
from .ScoreResultInterface import ScoreResultInterface
from ..helpers.TextHelper import TextHelper


from .Vocabulary.VocabularyCalculator import VocabularyCalculator
from .Grammar.GrammarCalculator import GrammarCalculator

from .analyze_dataset import word_data # variable containing my data_set


class EnglishCalculator(BaseLanguageCalculator, ScoreResultInterface):
    LANGUAGE = 'en'

    def __init__(self, text, audio_duration):
        self.text_helper = TextHelper()
        self.vocabulary_calculator = VocabularyCalculator()
        self.grammar_calculator = GrammarCalculator()
        super().__init__(text, audio_duration)

    def _detect_specified_language(self):
        try:
            detected_lang = detect(self.text)
            return detected_lang == self.LANGUAGE
        except:
            return False

    def _readability_score(self, flesch_reading_ease):
        readability_score = min(flesch_reading_ease / 100, 1) * self.WEIGHTS['readability']
        return readability_score

    def _calculate_result(self, *args):
        # Return my scores
        scores = ScoreResultInterface(
            *args
        )
        scores.recognized_language()  # To set my grade to its according value

        return scores

    def calculate_score(self):
        if not self._detect_specified_language():
            # Return dictionary with default results
            instance = ScoreResultInterface.unrecognized_language()
            return instance.to_dict()

        words = self.text_helper.get_words_list_from_text(self.text)
        unique_words = self.text_helper.get_count_of_unique_words(words)

        # Fluency calculations
        fluency_stats = self.calculate_fluency()

        # Vocabulary calculations
        lexical_diversity = self.vocabulary_calculator.calculate_lexical_diversity(words)
        classified_words = self.vocabulary_calculator.get_classified_words(words, word_data)
        vocabulary_stats = self.vocabulary_calculator.calculate_vocabulary_level(lexical_diversity, classified_words)

        # Grammar calculations
        grammar_stats = self.grammar_calculator.analyze_grammar_and_evaluate_level(self.text)

        # Pronunciation calculations
        pronunciation_stats = self.text

        # Calculate total score by summing all weighted components and capping at 100
        # total_score = self._calculate_total_score(vocab_score, readability_score, grammar_score)
        scores = self._calculate_result(fluency_stats, vocabulary_stats, grammar_stats, total_score, unique_words)

        return scores.to_dict()

    def calculate_fluency(self):
        """
        Analyze fluency and determine CEFR level.

        I could move this in seperated class if i need to expand logic
        """
        if not self.text:
            return {'error': 'No transcription text available'}

        # Get the transcription text
        transcript_text = self.text

        # Calculate word count
        words = transcript_text.split()
        total_words = TextHelper.get_len_of_words(words)

        # Calculate Words Per Second (WPS)
        min_audio_duration = max(self.audio_duration, 1.0)  # Minimum duration of 1 second
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

        # Map fluency score to CEFR level
        fluency_level = self.get_fluency_level(fluency_score)

        return {
            'words_per_second': round(words_per_second, 2),
            'fluency_score': fluency_score,
            'fluency_level': fluency_level,
        }

