from django.urls import path
from . import views

urlpatterns = [
    path('', views.ScoringView.as_view(), name='scoring'),
]