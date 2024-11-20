from django.shortcuts import render
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from django.core.mail import EmailMessage

from django.core.mail import send_mail
from backend.server.settings import EMAIL_HOST_USER


class EmailView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        try:
            # Extract data from the request
            data = request.data
            first_name = data.get('firstName')
            last_name = data.get('lastName')
            phone = data.get('phone')
            email = data.get('email')
            message_text = data.get('message')

            # Email subject and message
            subject = 'Contact Form Message'
            message = (
                f"Message from {first_name} {last_name}\n"
                f"Phone Number: {phone}\n"
                f"Email: {email}\n\n"
                f"Message:\n{message_text}"
            )

            # Send the email to your email address
            send_mail(subject, message, EMAIL_HOST_USER, [EMAIL_HOST_USER], fail_silently=False)

            # Respond with success
            return Response({"details": "Message sent successfully."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": f"Something went wrong: {str(e)}"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)