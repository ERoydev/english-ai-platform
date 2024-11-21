from rest_framework.exceptions import APIException

from .ContactService import ContactService


class EmailServiceDispatcher:
    """
    This dispatcher is going to decide based on passed email_type what Service to use
    """
    def __init__(self):
        self.services = {
            'contact': ContactService,
        }

    def get_service(self, raw_email_type, data):
        email_type = raw_email_type.lower()
        service_class = self.services.get(email_type)

        if not service_class:
            raise ServiceNotFoundException(detail=f"No service found for email type: {email_type}")

        # I initialize instance of that service_class passing the data
        return service_class(data)


class ServiceNotFoundException(APIException):
    status_code = 404  # Not Found
    default_detail = "The requested service was not found."
    default_code = "service_not_found"
