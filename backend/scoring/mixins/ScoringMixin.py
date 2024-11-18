from django.apps import apps

MultipleChoiceQuestion = apps.get_model('questions', 'MultipleChoiceQuestion')


class ScoringMixin:

    SCORING_WEIGHT = {
        1: 1,
        2: 2,
        3: 3,
    }

    def calculate_score(self, answers):
        """
            Calculate total score based on answers and correct answers.
            Expects {'1': 'joy', '2': 'happy'} as answers and the question_map returned from get_questions func
        """
        question_map = self.get_questions(answers)

        score_result = {
            "total_score": 0,
            "max_score": 0,
            "correct_answers": 0,
            "incorrect_answers": 0,
        }

        for _id, answer in answers.items():
            score_result['max_score'] += self.SCORING_WEIGHT[question_map[_id].difficulty]
            if answer == question_map[_id].correct_answer:
                score_result['correct_answers'] += 1
                score_result['total_score'] += self.SCORING_WEIGHT[question_map[_id].difficulty]
            else:
                score_result['incorrect_answers'] += 1
        return score_result

    @staticmethod
    def get_questions(answers):
        """
            Retrieve questions in a single query and map them by ID.
            Expects {'1': 'joy', '2': 'happy'} as answers parameters
         """
        question_ids = list(answers.keys())
        questions = MultipleChoiceQuestion.objects.filter(id__in=question_ids)
        return {str(question.id): question for question in questions}

    def get_grade(self, total_score, max_score):
        percent = (total_score / max_score) * 100