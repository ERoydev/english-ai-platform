from django.urls import path
from . import views

urlpatterns = [
    path('analyze_audio/', views.AnalyzeAudioView.as_view(), name='analyze_audio'),
]
