from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .base import BaseAuthentication
from backend.accounts.serializers import UserSerializer
from backend.utils import api_response
from rest_framework import status

UserModel = get_user_model()


class SignupView(BaseAuthentication):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        email = request.data['email']

        # Check if this email is taken
        if UserModel.objects.filter(email=email).exists():
            return api_response(status_str='fail', message='Registration failed', data={'details': 'it does not work'}, errors='This email address is already registered!', http_status=status.HTTP_400_BAD_REQUEST)

        if serializer.is_valid():
            user = UserModel.objects.create_user(
                email=request.data['email'],
                password=request.data['password']
            )
            token = Token.objects.create(user=user)
            user_serializer = UserSerializer(user)
            return api_response(status_str='success', message='Registration is completed', data={"token": token.key, "user": user_serializer.data}, http_status=status.HTTP_201_CREATED)

        return api_response(status_str='fail', message='Registration has failed', http_status=status.HTTP_400_BAD_REQUEST)

