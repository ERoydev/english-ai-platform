from django.contrib.auth import get_user_model, authenticate
from rest_framework.views import APIView

from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny
from backend.utils import api_response
import logging

logger = logging.getLogger(__name__)

from django.contrib.auth.middleware import AuthenticationMiddleware

UserModel = get_user_model() # I get my userModel

# class LoginView(APIView):
#     permission_classes = [AllowAny]  # Allow all users to access this view
#
#     def post(self, request, *args, **kwargs):
#         # Check that email and password are provided
#         if 'email' not in request.data or 'password' not in request.data:
#             return api_response(status_str='successfully', message='Email and password are required.', errors='Email or password is not provided', http_status=status.HTTP_400_BAD_REQUEST)
#
#         try:
#             # Try to authenticate user with provided email and password
#             user = authenticate(email=request.data['email'], password=request.data['password'])
#
#             if user is None:
#                 # User was not authenticated, return error response
#                 return api_response(status_str='successfully', message='Invalid email or password.', errors='Invalid email or password.', http_status=status.HTTP_401_UNAUTHORIZED)
#
#             # Create or get the user token
#             token, created = Token.objects.get_or_create(user=user)
#
#             # Serialize user data
#             serializer = UserSerializer(instance=user)
#
#             return api_response(status_str='successfully', message='User created successfully!', data={"token": token.key, "user": serializer.data}, http_status=status.HTTP_200_OK)
#
#         except Exception as e:
#             # Log the exception for debugging purposes
#             logger.error(f"Error during authentication: {str(e)}")
#             # Return a generic error message to the client
#             return api_response(status_str='failed', message="An error occurred during login.", http_status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = UserModel.objects.create_user(
                email=request.data['email'],
                password=request.data['password']
            )
            token = Token.objects.create(user=user)
            user_serializer = UserSerializer(user)
            return Response({"token": token.key, "user": user_serializer.data}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny


class TestTokenView(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"detail": f"passed for {request.user.email}", "passed": True})

class LogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        try:
            # Delete the user's token to log them out
            user.auth_token.delete()
            return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Something went wrong."}, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
# def getUserDetails(request):
#     user = request.user
#     serializer = UserSerializer(user)
#     return Response({"user": serializer.data}, status=status.HTTP_200_OK)

