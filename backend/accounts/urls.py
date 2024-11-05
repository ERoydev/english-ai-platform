from django.urls import path, re_path
from . import views

urlpatterns = [
    re_path('login', views.LoginView.as_view(), name='login'),
    re_path('signup', views.SignupView.as_view(), name='signup'),
    re_path("logout", views.LogoutView.as_view(), name='logout'),
    re_path('test_token', views.TestTokenView.as_view(), name='test_token'),
    re_path('getUserByToken', views.getUserByToken, name='getUserByToken')
]
