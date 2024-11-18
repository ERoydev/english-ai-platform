from core.mixins.GradeMixin import GradeMixin


class ScoringInterface(GradeMixin):
    def __init__(self, user, total_score, max_score, time_duration, correct_answers, incorrect_answers):
        self.user = user
        self.total_score = total_score
        self.max_score = max_score
        self.time_duration = time_duration
        self.correct_answers = correct_answers
        self.incorrect_answers = incorrect_answers
        self.grade_info = self.get_grade_description(total_score=self.total_score, max_score=self.max_score)

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

