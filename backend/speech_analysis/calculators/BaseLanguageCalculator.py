from abc import ABC, abstractmethod


class BaseLanguageCalculator(ABC):
    LANGUAGE = None # Language code for the specific calculator

    WEIGHTS = {
        'vocab_diversity': 20,
        'sentence_structure': 20,
        'readability': 30,
        'grammar': 30
    }

    def __init__(self, text):
        self.text = text

    @abstractmethod
    def calculate_score(self):
        """Override this method to implement language-specific scoring."""
        return {}

    @abstractmethod
    def _detect_specified_language(self):
        """Override in child classes to define language detection."""
        pass

    def _calculate_vocabulary_score(self, unique_words, word_count):
        return (unique_words / word_count) * self.WEIGHTS['vocab_diversity'] if word_count > 0 else 0

    def _calculate_sentence_structure_score(self, avg_sentence_length):
        if avg_sentence_length >= 8:
            return self.WEIGHTS['sentence_structure']
        return (avg_sentence_length / 8) * self.WEIGHTS['sentence_structure']

    @staticmethod
    def _calculate_total_score(vocab_score, sentence_structure_score, readability_score, grammar_score):
        formula = (vocab_score + sentence_structure_score + readability_score + grammar_score, 100)
        result = min(formula)
        return result
