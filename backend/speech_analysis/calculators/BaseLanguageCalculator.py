from abc import ABC, abstractmethod


class BaseLanguageCalculator(ABC):
    LANGUAGE = None # Language code for the specific calculator

    WEIGHTS = {
        'vocab_diversity': 20,
        'sentence_structure': 20,
        'readability': 30,
        'grammar': 30
    }

    def __init__(self, text, audio_duration):
        self.text = text
        self.audio_duration = audio_duration

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
