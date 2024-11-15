
class GradeMixin:
    """
        Used to establish the grade between used in Score app and Speech app.
    """
    GRADE_MAPPING = {
        (95, 100): {
            "grade": "A+",
            "description": "Excellent - Your English proficiency is outstanding. You can communicate fluently and effectively in almost any setting, including professional and academic environments. Your vocabulary, grammar, and sentence structure are highly developed, with minimal to no errors. You are well-prepared for advanced communication and nuanced discussions."
        },
        (85, 94): {
            "grade": "A",
            "description": "Very Good - You have a strong command of English. You can communicate comfortably and handle complex conversations with ease, though minor errors may occur occasionally. Your vocabulary is broad, and your sentences are well-structured. You may benefit from refining your grammar for advanced fluency but are otherwise a proficient communicator."
        },
        (80, 84): {
            "grade": "B",
            "description": "Good - You can communicate effectively in most situations. Your vocabulary and grammar are solid, and your sentences are generally clear and understandable. Minor mistakes are present but don’t significantly hinder communication. You’re capable of handling everyday interactions and some complex discussions, though further refinement would enhance your fluency."
        },
        (70, 79): {
            "grade": "C",
            "description": "Fair - You are able to communicate in familiar contexts, though some effort may be needed to maintain clarity in complex conversations. Your vocabulary is adequate, and your sentence structure is mostly correct, with noticeable errors. Improving grammar accuracy and expanding vocabulary would help you communicate more confidently and smoothly."
        },
        (60, 69): {
            "grade": "D",
            "description": "Basic - You can manage simple conversations and convey basic information, though frequent errors may impact clarity. Your vocabulary is limited, and sentence structure may be inconsistent, making communication challenging in less familiar contexts. Focusing on fundamental grammar and vocabulary development would strengthen your English proficiency."
        },
        (0, 59): {
            "grade": "F",
            "description": "Very Poor - Your English proficiency is minimal, with significant challenges in forming sentences and using vocabulary effectively. Communication is difficult, even for basic interactions. A focus on foundational English skills, including vocabulary building and grammar basics, will be essential to improve your communication abilities."
        },
    }

    def get_grade_description(self, total_score, max_score=None):
        rounded_score = int(total_score)

        if max_score:
            # I calculate in percent to get the grade if max_score is provided (used in Quiz)
            rounded_score = int((rounded_score / max_score) * 100)

        for score_range, grade_info in self.GRADE_MAPPING.items():
            if score_range[0] <= rounded_score <= score_range[1]:
                return grade_info

    @staticmethod
    def get_grade_for_unrecognized_language():
        grade = {
            "grade": "N/A",
            "description": "The language is not recognized. Please ensure the input contains valid and recognizable language content.",
            "status": "Unrecognized Language"
        }

        return grade