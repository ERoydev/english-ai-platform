from ...mixins.ScoringMixin import ScoringMixin

class PronunciationCalculator(ScoringMixin):

    def analyze_pronunciation(self, transcribed_audio, text):
        """
        Analyze pronunciation based on transcribed audio and assign a CEFR level.
        """
        # Step 1: Extract or estimate confidence scores
        confidence_scores = [
            seg.get('confidence', 0.85)  # Default to 0.85 if confidence is not available
            for seg in transcribed_audio.get('segments', [])
        ]
        average_confidence = sum(confidence_scores) / len(confidence_scores) if confidence_scores else 0.85

        # Step 2: Analyze fluency
        words = text.split()
        total_words = len(words)
        audio_duration = transcribed_audio.get('duration', 1.0)  # Fallback duration to 1 second if missing
        words_per_second = total_words / audio_duration if audio_duration > 0 else 0

        # Step 3: Analyze vocabulary richness
        unique_words = len(set(words))
        vocab_richness = unique_words / total_words if total_words > 0 else 0

        # Step 4: Aggregate metrics into a pronunciation score
        pronunciation_score = round((words_per_second * 20 + vocab_richness * 40 + average_confidence * 40), 2)

        # Step 5: Map pronunciation score to CEFR level
        pronunciation_level = self.map_pronunciation_to_cefr(pronunciation_score)

        return {
            'average_confidence': round(average_confidence, 2),
            'score': self.get_score(pronunciation_level),
            'level': pronunciation_level,
        }

    def map_pronunciation_to_cefr(self, pronunciation_score):
        """
        Map pronunciation score to a CEFR level.
        :param pronunciation_score: The calculated pronunciation score (0-100).
        :return: CEFR level as a string.
        """
        if pronunciation_score < 40:
            return "A1"
        elif pronunciation_score < 60:
            return "A2"
        elif pronunciation_score < 75:
            return "B1"
        elif pronunciation_score < 85:
            return "B2"
        elif pronunciation_score < 95:
            return "C1"
        else:
            return "C2"
