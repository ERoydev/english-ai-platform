from django.shortcuts import render
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .services.Email.dispatcher import EmailServiceDispatcher
from backend.utils import api_response


class EmailView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            raw_data = request.data
            email_data = raw_data.get('values')
            email_type = raw_data.get('emailType')

            email_dispatcher = EmailServiceDispatcher()

            # Instance of chosen service with properties (subject, message, receiver)
            email_service = email_dispatcher.get_service(email_type, email_data)
            email_service.send_email(email_service.subject, email_service.message, email_service.receiver)

            return api_response('success', 'The email is sent successfully!')
        except Exception as e:
            return api_response('failed', 'Something went wrong', errors='The email sending has failed!', http_status=status.HTTP_500_INTERNAL_SERVER_ERROR)