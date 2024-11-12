from django.urls import path, include
from . import views

urlpatterns = [
    path('get_sections/', views.SectionView.as_view(), name='get_sections'),
    path('get_subtopics/<int:section_id>/', views.SubtopicsView.as_view(), name='get_subtopics'),
    path('get_questions/<int:topic_id>/', views.QuestionsView.as_view(), name='get_questions')
]