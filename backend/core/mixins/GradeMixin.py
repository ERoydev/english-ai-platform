class GradeMixin:
    """
    Used to establish the grade between CEFR levels used in Score app and Speech app.
    """

    GRADE_MAPPING = {
        "C2": {
            "grade": "C2",
            "description": "Excellent - Your English proficiency is outstanding. You can communicate fluently and effectively in almost any setting, including professional and academic environments. Your vocabulary, grammar, and sentence structure are highly developed, with minimal to no errors. You are well-prepared for advanced communication and nuanced discussions."
        },
        "C1": {
            "grade": "C1",
            "description": "Very Good - You have a strong command of English. You can communicate comfortably and handle complex conversations with ease, though minor errors may occur occasionally. Your vocabulary is broad, and your sentences are well-structured. You may benefit from refining your grammar for advanced fluency but are otherwise a proficient communicator."
        },
        "B2": {
            "grade": "B2",
            "description": "Good - You can communicate effectively in most situations. Your vocabulary and grammar are solid, and your sentences are generally clear and understandable. Minor mistakes are present but don’t significantly hinder communication. You’re capable of handling everyday interactions and some complex discussions, though further refinement would enhance your fluency."
        },
        "B1": {
            "grade": "B1",
            "description": "Fair - You are able to communicate in familiar contexts, though some effort may be needed to maintain clarity in complex conversations. Your vocabulary is adequate, and your sentence structure is mostly correct, with noticeable errors. Improving grammar accuracy and expanding vocabulary would help you communicate more confidently and smoothly."
        },
        "A2": {
            "grade": "A2",
            "description": "Basic - You can manage simple conversations and convey basic information, though frequent errors may impact clarity. Your vocabulary is limited, and sentence structure may be inconsistent, making communication challenging in less familiar contexts. Focusing on fundamental grammar and vocabulary development would strengthen your English proficiency."
        },
        "A1": {
            "grade": "A1",
            "description": "Very Poor - Your English proficiency is minimal, with significant challenges in forming sentences and using vocabulary effectively. Communication is difficult, even for basic interactions. A focus on foundational English skills, including vocabulary building and grammar basics, will be essential to improve your communication abilities."
        },
    }

    def get_grade_description(self, english_level):
        """
        Get the grade and description based on the CEFR English level.
        :param english_level: The CEFR English level (e.g., A1, B2, C1).
        :return: Dictionary containing grade and description.
        """
        grade_info = self.GRADE_MAPPING.get(english_level)

        if grade_info:
            return grade_info
        else:
            return {
                "grade": "N/A",
                "description": "The English level provided is not recognized. Please ensure the input contains a valid CEFR English level.",
                "status": "Unrecognized Level"
            }

    @staticmethod
    def get_grade_for_unrecognized_language():
        """
        Return a grade description for unrecognized language cases.
        """
        return {
            "grade": "N/A",
            "description": "The language is not recognized. Please ensure the input contains valid and recognizable language content.",
            "status": "Unrecognized Language"
        }
