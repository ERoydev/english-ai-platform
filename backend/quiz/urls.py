from django.urls import path, include
from . import views

urlpatterns = [
    path('vocabulary_questions/', views.VocabularyView.as_view(), name='vocabulary_questions')
]