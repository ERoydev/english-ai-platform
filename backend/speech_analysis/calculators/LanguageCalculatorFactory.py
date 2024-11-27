from .EnglishCalculator import EnglishCalculator

"""
    Based on language parameter picks the Language Calculator Class
"""


class LanguageCalculatorFactory:
    """Factory to create a calculator for the specified language."""
    @staticmethod
    def get_calculator(language, text, audio_duration):
        calculators = {
            'en': EnglishCalculator,
            # Add other languages here, e.g., 'fr': FrenchCalculator, 'es': SpanishCalculator
        }
        calculator_class = calculators.get(language)

        if not calculator_class:
            raise ValueError(f"No calculator available for language: {language}")
        return calculator_class(text, audio_duration)

