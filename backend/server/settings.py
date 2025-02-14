"""
Django settings for server project.

Generated by 'django-admin startproject' using Django 5.1.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""

from pathlib import Path
import os

from environ import Env


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# I make configuration for production and development enviroment here
env = Env()
env_file = BASE_DIR / ".env"
env.read_env(str(env_file))

ENVIRONMENT = env('ENVIRONMENT', default="production")
ENVIRONMENT = "production"

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
# i have used get_random_key() from django.core.manager.utils something like that to generate new secret_key
SECRET_KEY = env('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!

if ENVIRONMENT == "development":
    DEBUG = True
else:
    DEBUG = False

ALLOWED_HOSTS = ['localhost', '127.0.0.1', 'lexilearn-doa1.onrender.com']


# Application definition
INSTALLED_APPS = [
    'jazzmin', # JAZZMIN Customization for admin
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # My Installed apps
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',

    # My apps
    'accounts',
    'roles',
    'speech_analysis',
    'questions',
    'scoring.apps.ScoringConfig',
    'core',
    'drf_spectacular', # for swagger

]


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # i have installed whiteNoise to handle staticfiles
    "whitenoise.middleware.WhiteNoiseMiddleware",

]

ROOT_URLCONF = 'server.urls'

# STATIC FILES CONFIGURATION HERE ---------------------
STATIC_URL = 'static/'
STATICFILES_DIRS = [BASE_DIR / 'static']
STATIC_ROOT = BASE_DIR / 'staticfiles'


# Settings for cloudinary
if ENVIRONMENT == "development":
    MEDIA_ROOT = BASE_DIR / 'media'
else:
    DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'
    CLOUDINARY_STORAGE = {
        'CLOUDINARY_URL': env('CLOUDINARY_URL'),
    }


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'server.wsgi.application'

# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases


# Database settings for development and production
if ENVIRONMENT == "development":
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": "ai_english",
            "USER": env('DATABASE_USER'),
            "PASSWORD": env('DATABASE_PASSWORD'),
            "HOST": "localhost",
            "PORT": "5432",
        }
    }
else:
    import dj_database_url
    DATABASES = {
        'default': dj_database_url.parse(env('DATABASE_URL')), # I get url from render in my case (External DB url)
    }

# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTHENTICATION_BACKENDS = [
    'accounts.backends.EmailBackend',  # Add this
    'django.contrib.auth.backends.ModelBackend',  # Default backend
]

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {
            'min_length': 8
        }
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
    {
        'NAME': 'accounts.validators.AlphaNumericUpperValidator',
    }
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = 'accounts.AccountUser'

CORS_ALLOWED_ORIGINS = [
    'http://localhost:5174',  # Add your frontend URL here
]

# If you need to allow credentials (e.g., cookies)
CORS_ALLOW_CREDENTIALS = True

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

# For my SWAGGER
SPECTACULAR_SETTINGS = {
    'TITLE': 'ai_english ',
    'DESCRIPTION': 'AI English Language learning app',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
    # OTHER SETTINGS
}

SPEECH_ANALYSIS_URL = "http://127.0.0.1:8000/speech_analysis/"

# EMAIL CONFIGURATION FOR EMAIL ( SMTP CONFIGURATION FOR GMAIL )
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = env('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD')
EMAIL_USE_TLS = True
EMAIL_USE_SSL = False


# settings.py
TEST_DISCOVER_PATTERN = "test_*.py"

# I create global variables to my datasets
CERF_DATASET_VOCABULARY_NORMAL = BASE_DIR / 'cerf-vocabulary-dataset.csv'
CERF_DATASET_VOCABULARY_C1C2 = BASE_DIR / 'cerf-vocabulary-c1c2.csv'
TRANSCRIPTION_MICROSERVICE_URL = 'https://speech2text-api.onrender.com/audio_transcription'