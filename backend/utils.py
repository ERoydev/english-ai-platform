from rest_framework.response import Response
from rest_framework import status


def api_response(status_str, message, data=None, errors=None, http_status=status.HTTP_200_OK):
    """
    Generate a standardized API response.
    Args:
        status_str (str): "success" or "error"
        message (str): Human-readable message
        data (dict, optional): Data payload
        errors (dict, optional): Error details
        http_status (int): HTTP status code
    Returns:
        Response: DRF Response object
    """
    return Response(
        {
            "status": status_str,
            "message": message,
            "data": data,
            "errors": errors,
        },
        status=http_status,
    )
