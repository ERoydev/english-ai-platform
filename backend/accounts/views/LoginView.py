from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny

from .base import BaseAuthentication
from backend.accounts.serializers import UserSerializer
from backend.utils import api_response
from rest_framework.authtoken.models import Token
from rest_framework import status

# Logger functionality
import logging
logger = logging.getLogger(__name__)


class LoginView(BaseAuthentication):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        # Check that email and password are provided
        if 'email' not in request.data or 'password' not in request.data:
            return api_response(status_str='successfully', message='Email and password are required.', errors='Email or password is not provided', http_status=status.HTTP_400_BAD_REQUEST)

        try:
            # Try to authenticate user with provided email and password
            user = authenticate(email=request.data['email'], password=request.data['password'])

            if user is None:
                # User was not authenticated, return error response
                return api_response(status_str='successfully', message='Invalid email or password.', errors='Invalid email or password.', http_status=status.HTTP_401_UNAUTHORIZED)

            # Create or get the user token
            token, created = Token.objects.get_or_create(user=user)

            # Serialize user data
            serializer = UserSerializer(instance=user)

            return api_response(status_str='successfully', message='User created successfully!', data={"token": token.key, "user": serializer.data}, http_status=status.HTTP_200_OK)

        except Exception as e:
            # Log the exception for debugging purposes
            logger.error(f"Error during authentication: {str(e)}")
            # Return a generic error message to the client
            return api_response(status_str='failed', message="An error occurred during login.", http_status=status.HTTP_500_INTERNAL_SERVER_ERROR)
