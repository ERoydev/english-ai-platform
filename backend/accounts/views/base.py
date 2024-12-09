from django.contrib.auth import get_user_model
from rest_framework.views import APIView


class BaseAuthentication(APIView):
    UserModel = get_user_model()
