import language_tool_python
from ...mixins.ScoringMixin import ScoringMixin


class GrammarCalculator(ScoringMixin):
    ERROR_WEIGHTS = {
        "TENSE": 3,  # Critical errors
        "AGREEMENT": 3,  # Critical errors
        "WORD_ORDER": 2,  # Moderate errors
        "SPELLING": 1,  # Minor errors
        "PUNCTUATION": 1,  # Minor errors
        "UNKNOWN": 1  # Default weight for unknown categories
    }

    LEVEL_THRESHOLDS = {
        "A1": (21, float('inf')),  # High error scores = beginner
        "A2": (16, 20),
        "B1": (11, 15),
        "B2": (6, 10),
        "C1": (1, 5),
        "C2": (0, 0),  # No errors = perfect grammar
    }

    def analyze_grammar_and_evaluate_level(self, text):
        """
        Analyze grammar errors and evaluate a grammar proficiency level (A1, A2, etc.).
        """
        tool = language_tool_python.LanguageTool('en-US')
        matches = tool.check(text)

        total_weight = 0
        total_sentences = len(text.split('.'))  # Basic sentence count based on periods
        error_sentences = set()

        for match in matches:
            # Parse ruleId for category
            category = match.ruleId.split('_')[0]

            # Add weighted score for this error
            weight = self.ERROR_WEIGHTS.get(category, self.ERROR_WEIGHTS["UNKNOWN"])
            total_weight += weight

            # Track sentences with errors
            if match.context:
                error_sentences.add(match.context)

        # Calculate grammar density
        correct_sentences = total_sentences - len(error_sentences)
        grammar_density = max(0, correct_sentences / total_sentences) if total_sentences > 0 else 0
        grammar_density = round(grammar_density, 2)

        # Determine grammar level based on score
        for level, (min_score, max_score) in self.LEVEL_THRESHOLDS.items():
            if min_score <= total_weight <= max_score:
                grammar_level = level
                break
        else:
            grammar_level = "A1"  # Default to lowest level for very high scores

        # Summary
        return {
            "level": {'score': grammar_level, 'description': 'Grammar proficiency level'},
            "score": {'score': self.get_score(grammar_level), 'description': 'Grammar proficiency score'},
            "total_weight": {'score': total_weight, 'description': 'Total weighted errors in the text'},
            "grammar_density": {'score': grammar_density, 'description': 'Ratio of correct sentences to total sentences'},
        }
