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
        total_score, max_score = 0, 0
        for _id, answer in answers.items():
            max_score += self.SCORING_WEIGHT[question_map[_id].difficulty]
            if answer == question_map[_id].correct_answer:
                total_score += 1
        return total_score, max_score

    @staticmethod
    def get_questions(answers):
        """
            Retrieve questions in a single query and map them by ID.
            Expects {'1': 'joy', '2': 'happy'} as answers parameters
         """
        question_ids = list(answers.keys())
        questions = MultipleChoiceQuestion.objects.filter(id__in=question_ids)
        return {str(question.id): question for question in questions}
