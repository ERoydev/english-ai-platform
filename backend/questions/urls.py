from django.urls import path, include
from . import views

urlpatterns = [
    path('sections/', views.SectionView.as_view(), name='sections'),
    path('subtopics/<int:section_id>/', views.SubtopicsView.as_view(), name='get_subtopics'),
    path('<int:topic_id>/', views.QuestionsView.as_view(), name='get_questions')
]