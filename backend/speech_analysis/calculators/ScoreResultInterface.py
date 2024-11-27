from dataclasses import dataclass, field
from abc import ABC, abstractmethod
from core.mixins.GradeMixin import GradeMixin
from ..mixins.ScoringMixin import ScoringMixin

"""
    Interface for speech_analysis score result
"""

@dataclass
class ScoreResultInterface(GradeMixin, ScoringMixin):
    def __init__(self, fluency_stats=None, vocabulary_stats=None, grammar_stats=None, total_score=0, unique_words=0):
        self.fluency_stats = fluency_stats
        self.vocabulary_stats = vocabulary_stats
        self.grammar_stats = grammar_stats
        self.total_score: int = total_score
        self.grade: dict = self.get_grade_for_unrecognized_language()
        self.unique_words: int = unique_words

    @classmethod
    def unrecognized_language(cls):
        """Factory method for unrecognized language result."""
        return cls()

    def recognized_language(self):
        self.grade = self.get_grade_description(self.total_score)

    def to_dict(self):
        """Convert the result to a dictionary."""
        return {
            'fluency_score': self.fluency_stats,
            'vocabulary_stats': self.vocabulary_stats,
            'grammar_stats': self.grammar_stats,
            'total_score': f'{self.total_score:.2f}',
            'grade': self.grade,
            'unique_words': self.unique_words,
        }
