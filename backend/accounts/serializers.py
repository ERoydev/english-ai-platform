from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

from .models import Profile

from rest_framework import serializers

UserModel = get_user_model()


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    profile = ProfileSerializer(read_only=True) # Nested serializer

    class Meta:
        model = UserModel
        fields = ['id', 'email', 'password', 'profile']

    # I call this to apply my AUTH_PASSWORD_VALIDATORS from my settings.py to validate my password on my backend
    def validate_password(self, value):
        """
        Validate the password using Django's built-in validators.
        """
        try:
            validate_password(value)  # Apply the default Django password validators
        except ValidationError as e:
            raise serializers.ValidationError(e.messages)  # Convert to serializer validation error

        return value