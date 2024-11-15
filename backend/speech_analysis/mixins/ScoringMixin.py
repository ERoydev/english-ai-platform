

class ScoringMixin:

    WEIGHTS = {
        'vocab_diversity': 20,
        'sentence_structure': 20,
        'readability': 30,
        'grammar': 30
    }

    def calculate_score_with_weight(self, score, weight_key):
        formula = f'{(score / self.WEIGHTS[weight_key]) * 100:.1f}'
        return formula
