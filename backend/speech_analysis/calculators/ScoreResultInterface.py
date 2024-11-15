from dataclasses import dataclass, field
from abc import ABC, abstractmethod

"""
    Interface for speech_analysis score result
"""

@dataclass
class ScoreResult(ABC):
    def __init__(self, grade, message):
        self._vocab_diversity_score: int = 0
        self._sentence_structure_score: int = 0
        self._readability_score: int = 0
        self._grammar_score: int = 0
        self._total_score: int = 0
        self._grade: object = grade
        self._unique_words: int = 0
        self._message: str = message

    @property
    def total_score(self):
        return self._total_score
    
    @total_score.setter
    def total_score(self, value):
        if value < 0:
            raise ValueError('Total Score cannot be negative')

        self._total_score = value

    @property
    def vocab_diversity_score(self):
        return self._vocab_diversity_score

    @vocab_diversity_score.setter
    def vocab_diversity_score(self, value):
        if value < 0:
            raise ValueError('Total Score cannot be negative')

        self._vocab_diversity_score = value
