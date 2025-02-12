from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
import os
from django.conf import settings

UserModel = get_user_model()

# python manage.py test tests --noinput

class TestSpeechAnalysis(TestCase):
    def setUp(self):
        self.client = APIClient()
        # Create a test user
        self.user = UserModel.objects.create_user(email='testuser@abv.bg', password='secret')

        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        self.url = reverse('analyze_audio')
        current_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(current_dir, 'test_audio2.wav')

        with open(file_path, 'rb') as f:
            audio_content = f.read()

        audio_file = SimpleUploadedFile(
            name='test_audio2.wav',
            content=audio_content,
            content_type='audio/wav'
        )

        self.data = {'audio': audio_file}

    def test_speech_analysis_without_audio_should_return_400_bad_request(self):
        response = self.client.post(reverse('analyze_audio'))
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        json_response = response.json()
        self.assertEqual(json_response['error'], "Missing audio file")

    def test_speech_analysis_should_return_response_with_all_objects(self):
        response = self.client.post(self.url, self.data, format='multipart')

        json_response = response.json()
        transcription = json_response['transcription']
        analysis_result = json_response['analysis_result']
        audio_duration = json_response['audio_duration']

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(transcription, " Hello, I want to test the functionality of my back end. I don't know why I am getting this errors.")
        self.assertEqual(analysis_result, {'basic_text_analyzer': {'sentence_count_analyzer': 2, 'word_count_analyzer': 20}})
        self.assertEqual(audio_duration, 7.32)

    def test_speech_analysis_language_score_all_stats_objects_should_be_valid(self):
        response = self.client.post(self.url, self.data, format='multipart')

        json_response = response.json()
        fluency_stats = json_response['language_scores']['fluency_stats']
        vocabulary_stats = json_response['language_scores']['vocabulary_stats']
        grammar_stats = json_response['language_scores']['grammar_stats']
        pronunciation_stats = json_response['language_scores']['pronunciation_stats']
        total_score = json_response['language_scores']['total_score']
        overall_level = json_response['language_scores']['overall_level']
        grade = json_response['language_scores']['grade']
        unique_words = json_response['language_scores']['unique_words']
        is_language_recognized = json_response['language_scores']['is_language_recognized']

        # print('-------------------')
        # print(fluency_stats)
        # print('-------------------')
        # print(vocabulary_stats)
        # print('-------------------')
        # print(grammar_stats)
        # print('-------------------')
        # print(pronunciation_stats)
        # print('-------------------')
        # print(total_score)
        # print('-------------------')
        # print(overall_level)
        # print('-------------------')
        # print(grade)
        # print('-------------------')
        # print(unique_words)
        # print('-------------------')
        # print(is_language_recognized)


        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(fluency_stats, {'level': {'score': 'C2', 'description': 'Level for fluency'}, 'score': {'score': 50, 'description': 'Words per second'}, 'words_per_second': {'score': 2.73, 'description': 'Count of words per second'}, 'speech_density': {'score': 0.91, 'description': 'Ratio of meaningful words to total audio duration'}})
        self.assertEqual(vocabulary_stats, {'level': {'score': 'B2', 'description': 'Level for vocabulary'}, 'score': {'score': 30, 'description': 'Score for vocabulary'}, 'lexical_diversity': {'score': 90.0, 'description': 'Percentage of unique words used', 'percentage': 'True'}, 'advanced_word_usage': {'score': 35.0, 'description': 'Percentage of advanced words used', 'percentage': 'True', 'classified_words': {'A1': ['I', 'to', 'test', 'the', 'of', 'my', 'I', 'know', 'why', 'I', 'am', 'this'], 'A2': ['back'], 'B1': [], 'B2': ['want', 'functionality'], 'C1': [], 'C2': ['Hello,', 'end.', "don't", 'getting', 'errors.']}}})
        self.assertEqual(grammar_stats, {'level': {'score': 'C1', 'description': 'Grammar proficiency level'}, 'score': {'score': 40, 'description': 'Grammar proficiency score'}, 'total_weight': {'score': 1, 'description': 'Total weighted errors in the text'}, 'grammar_density': {'score': 0.67, 'description': 'Ratio of correct sentences to total sentences'}})
        self.assertEqual(pronunciation_stats, {'level': {'score': 'C2', 'description': 'Level for pronunciation'}, 'score': {'score': 50, 'description': 'Score for pronunciation'}, 'average_confidence': {'score': 0.85, 'description': 'Average confidence score'}, 'articulation_rate': {'score': 17.0, 'description': 'Combination of fluency and clarity'}})
        self.assertEqual(total_score, 170)
        self.assertEqual(unique_words, 18)
        self.assertEqual(overall_level, 'C1')
        self.assertEqual(grade, {'grade': 'C1', 'description': 'Very Good - You have a strong command of English. You can communicate comfortably and handle complex conversations with ease, though minor errors may occur occasionally. Your vocabulary is broad, and your sentences are well-structured. You may benefit from refining your grammar for advanced fluency but are otherwise a proficient communicator.'})
        self.assertEqual(True, is_language_recognized)
