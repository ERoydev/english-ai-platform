from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
import os
UserModel = get_user_model()

class TestViews(TestCase):
    def setUp(self):
        self.client = APIClient()
        # Create a test user
        self.user = UserModel.objects.create_user(email='testuser@abv.bg', password='secret')

        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
