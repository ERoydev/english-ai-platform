from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
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
            # Ensure the user is deleting their own account or has admin rights
            if request.user.pk != pk and not request.user.is_staff:
                return api_response(
                    status_str="fail",
                    message="Permission denied",
                    http_status=status.HTTP_403_FORBIDDEN
                )

            # Retrieve the user instance or return 404
            instance = get_object_or_404(UserModel, pk=pk)

            instance.delete()
            return api_response(
                status_str="success",
                message="Account deleted successfully",
                http_status=status.HTTP_200_OK
            )

        except UserModel.DoesNotExist:
            return api_response(
                status_str="fail",
                message="User not found",
                http_status=status.HTTP_404_NOT_FOUND
            )

        except Exception as e:
            return api_response(
                status_str="error",
                message="An unexpected error occurred",
                errors={"details": str(e)},
                http_status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )