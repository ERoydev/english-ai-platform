from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import UserSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token

from django.shortcuts import get_object_or_404


UserModel = get_user_model() # I get my userModel


@api_view(['POST'])
def login(request):

    # Check that email and password are provided in the request.data
    if 'email' not in request.data or 'password' not in request.data:
        return Response({"detail": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)
    
    # Fetch the user by email or return error 404
    user = get_object_or_404(UserModel, email=request.data['email'])

    # Check if the password is correct
    if not user.check_password(request.data['password']):
        return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

    # Create or get the user token
    token, created = Token.objects.get_or_create(user=user)

    # Serialize the user data
    serializer = UserSerializer(instance=user)

    return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_200_OK)


@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = UserModel.objects.get(email=request.data['email'])
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)
        return Response({"token": token.key, "user": serializer.data})

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated


@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response({"detail": f"passed for {request.user.email}", "passed": True})


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    user = request.user
    try:
        # Delete the user's token to log them out
        user.auth_token.delete()
        return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
    except:
        return Response({"detail": "Something went wrong."}, status=status.HTTP_400_BAD_REQUEST)