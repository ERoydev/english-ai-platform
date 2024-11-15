from django.urls import path
from . import views

urlpatterns = [
    path('', views.AnalyzeAudioView.as_view(), name='analyze_audio'),
]
