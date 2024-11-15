from dataclasses import dataclass, field
from abc import ABC, abstractmethod
from backend.core.mixins.GradeMixin import GradeMixin
from ..mixins.ScoringMixin import ScoringMixin

"""
    Interface for speech_analysis score result
"""

@dataclass
class ScoreResultInterface(ABC, GradeMixin, ScoringMixin):
    def __init__(self, vocab_diversity_score=0, sentence_structure_score=0, readability_score=0,
                 grammar_score=0, total_score=0, unique_words=0):

        self.vocab_diversity_score: int = vocab_diversity_score
        self.sentence_structure_score: int = sentence_structure_score
        self.readability_score: int = readability_score
        self.grammar_score: int = grammar_score
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
            'vocab_diversity_score': self.calculate_score_with_weight(self.vocab_diversity_score, 'vocab_diversity'),
            'sentence_structure_score': self.calculate_score_with_weight(self.sentence_structure_score, 'sentence_structure'),
            'readability_score': self.calculate_score_with_weight(self.readability_score, 'readability'),
            'grammar_score': self.calculate_score_with_weight(self.grammar_score, 'grammar'),
            'total_score': f'{self.total_score:.2f}',
            'grade': self.grade,
            'unique_words': self.unique_words,
        }
