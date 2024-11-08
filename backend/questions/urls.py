from django.urls import path, include
from . import views

urlpatterns = [
    path('get_sections/', views.SectionView.as_view(), name='get_sections')
]