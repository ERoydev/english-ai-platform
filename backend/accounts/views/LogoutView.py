from requests import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from .base import BaseAuthentication
from rest_framework import status

from utils import api_response


class LogoutView(BaseAuthentication):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        try:
            # Delete the user's token to log them out
            user.auth_token.delete()
            return api_response(status_str='success', message='Successfully logged out', http_status=status.HTTP_200_OK)
        except:
            return api_response(status_str='fail', message='Logout failed!', http_status=status.HTTP_400_BAD_REQUEST)
