from django.urls import path, re_path
from . import views

urlpatterns = [
    re_path('login', views.login, name='login'),
    re_path('signup', views.signup, name='signup'),
    re_path("logout", views.logout, name='logout'),
    re_path('test_token', views.test_token, name='test_token'),
    re_path('getUserByToken', views.getUserByToken, name='getUserByToken')
]
