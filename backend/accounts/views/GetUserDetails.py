from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status
from backend.accounts.serializers import UserSerializer

# Custom response util
from backend.utils import api_response
from .base import BaseAuthentication


class GetUserDetails(BaseAuthentication):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)

        return api_response(status_str='success', message='User data retrieved successfully',
                            data={'user': serializer.data}, http_status=status.HTTP_200_OK)
