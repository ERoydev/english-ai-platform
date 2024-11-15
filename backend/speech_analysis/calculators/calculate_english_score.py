import textstat
import re
from langdetect import detect
from backend.core.mixins import GradeMixin
from .BaseLanguageCalculator import BaseLanguageCalculator


class EnglishCalculator(BaseLanguageCalculator, GradeMixin):
    LANGUAGE = 'en'

    def __init__(self, text):
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
        # Check if the specified language (e.g., English) is detected
        if not self._detect_specified_language():
            return {
                'vocab_diversity_score': 0,
                'sentence_structure_score': 0,
                'readability_score': 0,
                'grammar_score': 0,
                'total_score': 0,
                'grade': self.get_grade_for_unrecognized_language(),
                'unique_words': 0,
                'message': 'Non-English text detected. Please provide English text for accurate scoring.'
            }

        words = self.text.split()
        word_count = len(words)
        unique_words = len(set(words))
        vocab_score = self._calculate_vocabulary_score(unique_words, word_count)

        # Sentence and readability analysis
        sentences = re.split(r'[.!?]', self.text)
        sentences = [s.strip() for s in sentences if s.strip()]
        sentence_count = len(sentences)
        avg_sentence_length = sum(len(s.split()) for s in sentences) / sentence_count if sentence_count > 0 else 0
        sentence_structure_score = self._calculate_sentence_structure_score(avg_sentence_length)

        # Readability score calculation
        flesch_reading_ease = textstat.flesch_reading_ease(self.text)
        readability_score = min(flesch_reading_ease / 100, 1) * self.WEIGHTS['readability']

        # Grammar score (placeholder) - This needs a real implementation
        grammar_score = (80 / 100) * self.WEIGHTS['grammar']  # Placeholder score at 80% accuracy

        # Calculate total score by summing all weighted components and capping at 100
        total_score = min(vocab_score + sentence_structure_score + readability_score + grammar_score, 100)
        grade = self.get_grade_description(total_score)

        # Return detailed scoring with percentage calculations
        return {
            'vocab_diversity_score': f'{(vocab_score / self.WEIGHTS['vocab_diversity']) * 100:.1f}',
            'sentence_structure_score': f'{(sentence_structure_score / self.WEIGHTS['sentence_structure']) * 100:.1f}',
            'readability_score': f'{(readability_score / self.WEIGHTS['readability']) * 100:.1f}',
            'grammar_score': f'{(grammar_score / self.WEIGHTS['grammar']) * 100:.1f}',
            'total_score': f'{total_score:.2f}',
            'unique_words': unique_words,
            'grade': grade,
        }


class LanguageCalculatorFactory:
    """Factory to create a calculator for the specified language."""
    @staticmethod
    def get_calculator(language, text):
        calculators = {
            'en': EnglishCalculator,
            # Add other languages here, e.g., 'fr': FrenchCalculator, 'es': SpanishCalculator
        }
        calculator_class = calculators.get(language)
        if not calculator_class:
            raise ValueError(f"No calculator available for language: {language}")
        return calculator_class(text)

