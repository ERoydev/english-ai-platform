

class VocabularyCalculator:

    @staticmethod
    def calculate_vocabulary_level(lexical_diversity, classified_words):
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

        # Add a lexical diversity boost
        if lexical_diversity >= 0.4 and base_level in ["A1", "B1"]:
            base_level = "B1" if base_level == "A1" else "B2"
        elif lexical_diversity >= 0.6 and base_level in ["B1", "B2"]:
            base_level = "B2" if base_level == "B1" else "C1"

        return {
            'lexical_diversity': lexical_diversity,
            'vocabulary_level': base_level,
        }

    @staticmethod
    def calculate_lexical_diversity(words):
        """
        Calculate lexical diversity: Unique Words / Total Words
        """
        total_words = len(words)
        unique_words = len(set(words))
        lexical_diversity = unique_words / total_words if total_words > 0 else 0
        return round(lexical_diversity, 2)

    @staticmethod
    def get_classified_words(words, word_data):
        """
        Classify words from a user's transcription into CEFR levels.
        """
        classified_words = {"A1": [], "A2": [], "B1": [], "B2": [], "C1": [], "C2": []}

        for word in words:
            # Find the word in the dataset
            row = word_data[word_data['word'] == word.lower()]
            if not row.empty:
                level = row['cefr_level'].iloc[0]
                classified_words[level].append(word)
            else:
                classified_words["C2"].append(word)  # Default to C2 if not found

        return classified_words

