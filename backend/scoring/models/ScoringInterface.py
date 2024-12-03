from core.mixins.GradeMixin import GradeMixin


class ScoringInterface(GradeMixin):
    def __init__(self, user, total_score, max_score, time_duration, correct_answers, incorrect_answers):
        self.user = user
        self.total_score = total_score
        self.max_score = max_score
        self.time_duration = time_duration
        self.correct_answers = correct_answers
        self.incorrect_answers = incorrect_answers
        self.grade_info = self.get_grade_description(self.determine_english_level())

    def to_dict(self):
        return {
            "user": self.user.pk,
            "total_score": self.total_score,
            "max_score": self.max_score,
            "time_duration": self.time_duration,
            "correct_answers": self.correct_answers,
            "incorrect_answers": self.incorrect_answers,
            "grade_info": self.grade_info,
        }

    def determine_english_level(self):
        """
        Determine the English level (A1, A2, B1, etc.) based on the total score and max score.
        :param total_score: The user's total score.
        :param max_score: The maximum possible score.
        :return: The CEFR English level (A1, A2, B1, B2, C1, C2).
        """
        if self.max_score <= 0:
            raise ValueError("max_score must be greater than 0")

        # Calculate percentage
        percentage = (self.total_score / self.max_score) * 100

        # Map percentage to CEFR levels
        if percentage <= 20:
            return "A1"
        elif percentage <= 40:
            return "A2"
        elif percentage <= 60:
            return "B1"
        elif percentage <= 80:
            return "B2"
        elif percentage <= 90:
            return "C1"
        else:
            return "C2"
