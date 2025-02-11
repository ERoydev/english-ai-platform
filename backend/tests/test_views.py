from django.test import Client, TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model

UserModel = get_user_model()

class TestViews(TestCase):
    def setUp(self):
        self.client = Client()
        # Create a test user
        self.user = UserModel.objects.create_user(email='testuser@abv.bg', password='secret')

    def test_speech_analysis_GET(self):
        logged_in = self.client.login(email='testuser@abv.bg', password='secret')

        self.assertTrue(logged_in, "Login failed, check your credentials")

        response = self.client.get(reverse('analyze_audio'))
        print(response)

