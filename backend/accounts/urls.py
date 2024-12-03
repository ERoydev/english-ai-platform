from django.urls import path, re_path
from .views.LoginView import LoginView
from .views.LogoutView import LogoutView
from .views.GetUserDetails import GetUserDetails
from .views.SignupView import SignupView
from .views.TestTokenView import TestTokenView
from .views.DeleteUser import DeleteUser

from . import views
urlpatterns = [
    re_path('login', LoginView.as_view(), name='login'),
    re_path('signup', SignupView.as_view(), name='signup'),
    re_path("logout", LogoutView.as_view(), name='logout'),
    re_path('test_token', TestTokenView.as_view(), name='test_token'),
    re_path('get_user_details', GetUserDetails.as_view(), name='get_user_by_token'),

    re_path('delete', DeleteUser.as_view(), name='delete_user')
]
