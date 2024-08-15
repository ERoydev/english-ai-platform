from django.urls import path, re_path
from . import views

urlpatterns = [
    re_path('signup/', views.signup.as_view(), name='signup'),
    re_path('login/', views.login.as_view(), name='login'),
    re_path('test_token', views.test_token, name='test_token'),
]
