from langdetect import detect
from .BaseLanguageCalculator import BaseLanguageCalculator
from .ScoreResultInterface import ScoreResultInterface
from ..helpers.TextHelper import TextHelper


from .Vocabulary.VocabularyCalculator import VocabularyCalculator
from .Grammar.GrammarCalculator import GrammarCalculator
from .Pronunciation.PronunciationCalculator import PronunciationCalculator
from .Fluency.FluencyCalculator import FluencyCalculator

from .analyze_dataset import word_data # variable containing my data_set


class EnglishCalculator(BaseLanguageCalculator, ScoreResultInterface):
    LANGUAGE = 'en'

    def __init__(self, text, audio_duration, transcribed_audio):
        self.text_helper = TextHelper()
        self.transcribed_audio = transcribed_audio
        self.fluency_calculator = FluencyCalculator()
        self.vocabulary_calculator = VocabularyCalculator()
        self.grammar_calculator = GrammarCalculator()
        self.pronunciation_calculator = PronunciationCalculator()
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
        fluency_stats = self.fluency_calculator.calculate_fluency(self.text, self.audio_duration)

        # Vocabulary calculations
        lexical_diversity = self.vocabulary_calculator.calculate_lexical_diversity(words)
        classified_words = self.vocabulary_calculator.get_classified_words(words, word_data)
        vocabulary_stats = self.vocabulary_calculator.calculate_vocabulary_level(lexical_diversity, classified_words)

        # Grammar calculations
        grammar_stats = self.grammar_calculator.analyze_grammar_and_evaluate_level(self.text)

        # Pronunciation calculations
        pronunciation_stats = self.pronunciation_calculator.analyze_pronunciation(self.transcribed_audio, self.text)

        # Calculate total score by summing all weighted components and capping at 100
        scores = self._calculate_result(fluency_stats, vocabulary_stats, grammar_stats, pronunciation_stats, unique_words)

        return scores.to_dict()
