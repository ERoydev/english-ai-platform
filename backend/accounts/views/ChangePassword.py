
from .base import BaseAuthentication
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from utils import api_response


class ChangePassword(BaseAuthentication):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, pk, *args, **kwargs):
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')

        user = self.UserModel.objects.get(pk=pk)

        if not user.check_password(old_password):
            return api_response(status_str='failed', message='Current Password is not correct!', errors='Current Password is not correct!', http_status=status.HTTP_401_UNAUTHORIZED)

        user.set_password(new_password)
        user.save()

        return api_response(status_str='success', message='Password changed successfully!', http_status=status.HTTP_200_OK)
