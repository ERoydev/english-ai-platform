"""
WSGI config for server project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')

application = get_wsgi_application()


"""

manage.py

1. One instance of the project
2. Hot reloading
3. Serves static files

gunicorn

1. Specify how many workers you want
2. No hot reload, totally stable
3. Doesn't server static files

"""