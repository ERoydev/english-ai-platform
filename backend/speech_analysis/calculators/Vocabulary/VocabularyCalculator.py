from ...mixins.ScoringMixin import ScoringMixin


class VocabularyCalculator(ScoringMixin):

    def calculate_vocabulary_level(self, lexical_diversity, classified_words):
        """
        Calculate vocabulary level (A1, A2, B1, etc.) based on lexical diversity and word levels.
        Buffed version to encourage users with positive feedback.
        """
        # Reward advanced words more
        weights = {"A1": 1, "A2": 2, "B1": 3, "B2": 5, "C1": 6, "C2": 7}

        # Total number of words
        total_words = sum(len(words) for words in classified_words.values())
        if total_words == 0:
            return "A1"  # Default for no input

        # Calculate weighted sum for CEFR word levels
        weighted_sum = sum(weights[level] * len(words) for level, words in classified_words.items())
        average_level_score = weighted_sum / total_words

        # Base level based on weighted average
        base_level = self.calculate_base_level(average_level_score)

        # Add a lexical diversity boost
        if lexical_diversity >= 0.4 and base_level in ["A1", "B1"]:
            base_level = "B1" if base_level == "A1" else "B2"
        elif lexical_diversity >= 0.6 and base_level in ["B1", "B2"]:
            base_level = "B2" if base_level == "B1" else "C1"

        # Calculate advanced word usage
        advanced_word_usage = self.calculate_advanced_word_usage(classified_words, total_words)

        return {
            'level': {'score': base_level, 'description': 'Level for vocabulary'},
            'score': {'score': self.get_score(base_level), 'description': 'Score for vocabulary'},
            'lexical_diversity': {'score': lexical_diversity, 'description': 'Percentage of unique words used', 'percentage': 'True'},
            'advanced_word_usage': {'score': advanced_word_usage, 'description': 'Percentage of advanced words used', 'percentage': 'True', 'classified_words': classified_words},
        }

    @staticmethod
    def calculate_advanced_word_usage(classified_words, total_words):
        # Calculate advanced word usage
        advanced_words = len(classified_words["B2"]) + len(classified_words["C1"]) + len(classified_words["C2"])
        advanced_word_usage = advanced_words / total_words if total_words > 0 else 0
        advanced_word_usage = round(advanced_word_usage * 100, 2)  # Convert to percentage
        return advanced_word_usage

    @staticmethod
    def calculate_lexical_diversity(words):
        """
        Calculate lexical diversity: Unique Words / Total Words and return as a percentage.
        """
        total_words = len(words)
        unique_words = len(set(words))
        lexical_diversity = unique_words / total_words if total_words > 0 else 0
        return round(lexical_diversity * 100, 2)  # Return percentage

    @staticmethod
    def get_classified_words(words, word_data):
        """
        Classify words from a user's transcription into CEFR levels.
        This function maps words into their respective levels!
        """
        # Initialize dictionary for classified words
        classified_words = {"A1": [], "A2": [], "B1": [], "B2": [], "C1": [], "C2": []}

        for word in words:
            # Normalize the word (case-insensitive comparison)
            row = word_data[word_data['headword'].str.lower() == word.lower()]
            if not row.empty:
                # Retrieve the CEFR level
                level = row['CEFR'].iloc[0]
                classified_words[level].append(word)
            else:
                # Default to C2 if the word is not found
                classified_words["C2"].append(word)

        return classified_words


    @staticmethod
    def calculate_base_level(average_level_score):
        if average_level_score < 2.5:
            base_level = "A1"
        elif 2.5 <= average_level_score < 4.0:
            base_level = "B1"
        elif 4.0 <= average_level_score < 5.5:
            base_level = "B2"
        elif 5.5 <= average_level_score < 6.5:
            base_level = "C1"
        else:
            base_level = "C2"

        return base_level
