from django.contrib.auth import get_user_model
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .base import BaseAuthentication
from utils import api_response

UserModel = get_user_model()


class DeleteUser(BaseAuthentication):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk, *args, **kwargs):
        try:
            instance = UserModel.objects.get(pk=pk)
        except UserModel.DoesNotExist:
            return api_response(status_str='fail', message='Something happened', http_status=status.HTTP_400_BAD_REQUEST)

        instance.delete()
        return api_response(status_str='success', message='Account deleted successfully', http_status=status.HTTP_200_OK)
