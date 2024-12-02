import language_tool_python


class GrammarCalculator:
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

        categorized_issues = {}
        total_weight = 0

        for match in matches:
            # Parse ruleId for category
            category = match.ruleId.split('_')[0]
            if category not in categorized_issues:
                categorized_issues[category] = []

            categorized_issues[category].append({
                "error": match.message,
                "suggestions": match.replacements,
                "offset": match.offset,
                "length": match.errorLength,
                "context": match.context,
                "rule_id": match.ruleId
            })

            # Add weighted score for this error
            weight = self.ERROR_WEIGHTS.get(category, self.ERROR_WEIGHTS["UNKNOWN"])
            total_weight += weight

        # Determine grammar level based on score
        for level, (min_score, max_score) in self.LEVEL_THRESHOLDS.items():
            if min_score <= total_weight <= max_score:
                grammar_level = level
                break
        else:
            grammar_level = "A1"  # Default to lowest level for very high scores

        # Summary
        summary = {
            "total_errors": sum(len(issues) for issues in categorized_issues.values()),
            "total_weight": total_weight,
            "error_categories": {category: len(issues) for category, issues in categorized_issues.items()},
            "grammar_level": grammar_level
        }

        return {
            "issues": categorized_issues,
            "summary": summary
        }
