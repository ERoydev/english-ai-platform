from dataclasses import dataclass, field
from abc import ABC, abstractmethod
from core.mixins.GradeMixin import GradeMixin
from ..mixins.ScoringMixin import ScoringMixin


"""
    Interface for speech_analysis score result
"""

@dataclass
class ScoreResultInterface(GradeMixin, ScoringMixin):
    OVERALL_LEVEL_THRESHOLDS = {
        "A1": (0, 40),
        "A2": (40, 80),
        "B1": (80, 120),
        "B2": (120, 160),
        "C1": (160, 200),
        "C2": (200, float('inf'))  # Infinite upper bound for C2
    }

    def __init__(self, fluency_stats=None, vocabulary_stats=None, grammar_stats=None, pronunciation_stats=None, unique_words=0):
        self.fluency_stats = fluency_stats
        self.vocabulary_stats = vocabulary_stats
        self.grammar_stats = grammar_stats
        self.pronunciation_stats = pronunciation_stats
        self.grade: dict = self.get_grade_for_unrecognized_language()
        self.unique_words: int = unique_words
        self.total_score = 0 # DEFAULT VALUE
        self.overall_level = 'A1'

    def calculate_total_score(self):
        total_score = 0
        ENGLISH_TOPICS = [self.vocabulary_stats, self.grammar_stats, self.fluency_stats, self.pronunciation_stats]
        for topic in ENGLISH_TOPICS:
            self.total_score += topic['score']

        return self.total_score

    def get_overall_level(self):
        for level, scores in self.OVERALL_LEVEL_THRESHOLDS.items():
            if scores[0] <= self.total_score < scores[1]:
                self.overall_level = level
                return level

        return 'A1'

    @classmethod
    def unrecognized_language(cls):
        """Factory method for unrecognized language result."""
        return cls()

    def recognized_language(self):
        self.grade = self.get_grade_description(self.total_score)


    def to_dict(self):
        """Convert the result to a dictionary."""
        return {
            'fluency_stats': self.fluency_stats,
            'vocabulary_stats': self.vocabulary_stats,
            'grammar_stats': self.grammar_stats,
            'pronunciation_stats': self.pronunciation_stats,
            'total_score': self.calculate_total_score(),
            'overall_level': self.get_overall_level(),
            'grade': self.get_grade_description(self.overall_level),
            'unique_words': self.unique_words,
        }
