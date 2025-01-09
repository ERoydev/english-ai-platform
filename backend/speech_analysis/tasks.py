from celery import shared_task

@shared_task
def analyze_speech():
    return 'Celery is working!'