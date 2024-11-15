import re

class TextHelper:

    @staticmethod
    def get_words_list_from_text(words):
        return words.split()

    @staticmethod
    def get_count_of_words_in_text(words):
        return len(words)

    @staticmethod
    def get_count_of_unique_words(words):
        return len(set(words))

    @staticmethod
    def get_sentences_in_list_from_text(text):
        sentences_with_whitespace = re.split(r'[.!?]', text)
        sentences = [s.strip() for s in sentences_with_whitespace if s.strip()]

        return sentences

    @staticmethod
    def get_sentence_count(sentences):
        return len(sentences)

    @staticmethod
    def get_average_sentence_length(sentences, sentence_count):
        result = sum(len(s.split()) for s in sentences) / sentence_count if sentence_count > 0 else 0
        return result
