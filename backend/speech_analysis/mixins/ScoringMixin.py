
class ScoringMixin:
    LEVEL_SCORES = {
        """
            Calculate for example if Vocabulary is A2 i get 10 scores for this section
        """
        "A1": 5,
        "A2": 10,
        "B1": 20,
        "B2": 30,
        "C1": 40,
        "C2": 50
    }

    def get_score(self, level):
        for s_level, score in self.LEVEL_SCORES.items():
            if s_level == level:
                return score
