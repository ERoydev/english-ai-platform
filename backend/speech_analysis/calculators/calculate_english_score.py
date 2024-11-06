import textstat
import re
from collections import Counter
from langdetect import detect
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

    def detect_specified_language(self):
        """Override in child classes to define language detection."""
        pass

    def calculate_score(self):
        """Override this method to implement language-specific scoring."""
        return {}

    def calculate_vocabulary_score(self, unique_words, word_count):
        return (unique_words / word_count) * self.WEIGHTS['vocab_diversity'] if word_count > 0 else 0

    def calculate_sentence_structure_score(self, avg_sentence_length):
        if avg_sentence_length >= 8:
            return self.WEIGHTS['sentence_structure']
        return (avg_sentence_length / 8) * self.WEIGHTS['sentence_structure']


class EnglishCalculator(BaseLanguageCalculator):
    LANGUAGE = 'en'
    GRADE_MAPPING = {
        (90, 100): {
            "grade": "A+",
            "description": "Excellent - Your English proficiency is outstanding. You can communicate fluently and effectively in almost any setting, including professional and academic environments. Your vocabulary, grammar, and sentence structure are highly developed, with minimal to no errors. You are well-prepared for advanced communication and nuanced discussions."
        },
        (80, 89): {
            "grade": "A",
            "description": "Very Good - You have a strong command of English. You can communicate comfortably and handle complex conversations with ease, though minor errors may occur occasionally. Your vocabulary is broad, and your sentences are well-structured. You may benefit from refining your grammar for advanced fluency but are otherwise a proficient communicator."
        },
        (70, 79): {
            "grade": "B",
            "description": "Good - You can communicate effectively in most situations. Your vocabulary and grammar are solid, and your sentences are generally clear and understandable. Minor mistakes are present but don’t significantly hinder communication. You’re capable of handling everyday interactions and some complex discussions, though further refinement would enhance your fluency."
        },
        (60, 69): {
            "grade": "C",
            "description": "Fair - You are able to communicate in familiar contexts, though some effort may be needed to maintain clarity in complex conversations. Your vocabulary is adequate, and your sentence structure is mostly correct, with noticeable errors. Improving grammar accuracy and expanding vocabulary would help you communicate more confidently and smoothly."
        },
        (50, 59): {
            "grade": "D",
            "description": "Basic - You can manage simple conversations and convey basic information, though frequent errors may impact clarity. Your vocabulary is limited, and sentence structure may be inconsistent, making communication challenging in less familiar contexts. Focusing on fundamental grammar and vocabulary development would strengthen your English proficiency."
        },
        (40, 49): {
            "grade": "E",
            "description": "Poor - Your English proficiency is limited, with numerous errors affecting communication. You may struggle to construct clear sentences, and your vocabulary is restricted to basic terms. Simple interactions are possible, but complex conversations may be challenging. Significant practice with sentence formation, grammar, and vocabulary is recommended."
        },
        (0, 39): {
            "grade": "F",
            "description": "Very Poor - Your English proficiency is minimal, with significant challenges in forming sentences and using vocabulary effectively. Communication is difficult, even for basic interactions. A focus on foundational English skills, including vocabulary building and grammar basics, will be essential to improve your communication abilities."
        },
    }

    def __init__(self, text):
        super().__init__(text)

    def detect_specified_language(self):
        try:
            detected_lang = detect(self.text)
            return detected_lang == self.LANGUAGE
        except:
            return False

    def readability_score(self, flesch_reading_ease):
        readability_score = min(flesch_reading_ease / 100, 1) * self.WEIGHTS['readability']
        return readability_score

    def get_grade_description(self, total_score):
        rounded_score = int(total_score)
        for score_range, grade_info in self.GRADE_MAPPING.items():
            if score_range[0] <= rounded_score <= score_range[1]:
                return grade_info

    def calculate_score(self):
        # Check if the specified language (e.g., English) is detected
        if not self.detect_specified_language():
            return {
                'vocab_diversity_score': 0,
                'sentence_structure_score': 0,
                'readability_score': 0,
                'grammar_score': 0,
                'total_score': 0,
                'grade': 'F',
                'message': 'Non-English text detected. Please provide English text for accurate scoring.'
            }

        words = self.text.split()
        word_count = len(words)
        unique_words = len(set(words))
        vocab_score = self.calculate_vocabulary_score(unique_words, word_count)

        # Sentence and readability analysis
        sentences = re.split(r'[.!?]', self.text)
        sentences = [s.strip() for s in sentences if s.strip()]
        sentence_count = len(sentences)
        avg_sentence_length = sum(len(s.split()) for s in sentences) / sentence_count if sentence_count > 0 else 0
        sentence_structure_score = self.calculate_sentence_structure_score(avg_sentence_length)

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

