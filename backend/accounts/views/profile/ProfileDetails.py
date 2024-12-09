from ..base import BaseAuthentication
from utils import api_response
from rest_framework import status


class ProfileDetails(BaseAuthentication):

    def post(self, request, pk, *args, **kwargs):
        form_values = request.data.get('formValues')

        user = self.UserModel.objects.get(pk=pk)

        for field, value in form_values.items():
            if value:
                setattr(user.profile, field, value)

        user.profile.save()
        return api_response(status_str='success', message='Profile information updated!', http_status=status.HTTP_200_OK)

