import textstat
from langdetect import detect
from .BaseLanguageCalculator import BaseLanguageCalculator
from .ScoreResultInterface import ScoreResultInterface
from ..helpers.TextHelper import TextHelper
from abc import ABC, abstractmethod


class EnglishCalculator(BaseLanguageCalculator, ScoreResultInterface):
    LANGUAGE = 'en'

    def __init__(self, text):
        self.text_helper = TextHelper()
        super().__init__(text)

    def _detect_specified_language(self):
        try:
            detected_lang = detect(self.text)
            return detected_lang == self.LANGUAGE
        except:
            return False

    def _readability_score(self, flesch_reading_ease):
        readability_score = min(flesch_reading_ease / 100, 1) * self.WEIGHTS['readability']
        return readability_score

    def calculate_score(self):
        if not self._detect_specified_language():
            # Return dictionary with default results
            instance = ScoreResultInterface.unrecognized_language()
            return instance.to_dict()

        words = self.text_helper.get_words_list_from_text(self.text)
        word_count = self.text_helper.get_count_of_words_in_text(words)
        unique_words = self.text_helper.get_count_of_unique_words(words)

        vocab_score = self._calculate_vocabulary_score(unique_words, word_count)

        # Sentence and readability analysis
        sentences = self.text_helper.get_sentences_in_list_from_text(self.text)
        sentence_count = self.text_helper.get_sentence_count(self.text)
        avg_sentence_length = self.text_helper.get_average_sentence_length(sentences, sentence_count)
        sentence_structure_score = self._calculate_sentence_structure_score(avg_sentence_length)

        # Readability score calculation
        flesch_reading_ease = textstat.flesch_reading_ease(self.text)
        readability_score = min(flesch_reading_ease / 100, 1) * self.WEIGHTS['readability']

        # Grammar score (placeholder) - This needs a real implementation
        grammar_score = (80 / 100) * self.WEIGHTS['grammar']  # Placeholder score at 80% accuracy

        # Calculate total score by summing all weighted components and capping at 100
        total_score = self._calculate_total_score(vocab_score, sentence_structure_score, readability_score, grammar_score)
        # Return detailed scoring with percentage calculations

        result = ScoreResultInterface(
            vocab_score,
            sentence_structure_score,
            readability_score,
            grammar_score,
            total_score,unique_words
        )

        return result.to_dict()

