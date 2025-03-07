from django.urls import path, re_path
from .views.LoginView import LoginView
from .views.LogoutView import LogoutView
from .views.GetUserDetails import GetUserDetails
from .views.SignupView import SignupView
from .views.TestTokenView import TestTokenView
from .views.DeleteUser import DeleteUser
from .views.ChangePassword import ChangePassword
from .views.profile.ProfileDetails import ProfileDetails


urlpatterns = [
    re_path('login', LoginView.as_view(), name='login'),
    re_path('signup', SignupView.as_view(), name='signup'),
    re_path("logout", LogoutView.as_view(), name='logout'),
    re_path('test_token', TestTokenView.as_view(), name='test_token'),
    re_path('get_user_details', GetUserDetails.as_view(), name='get_user_by_token'),

    path('delete/<int:pk>/', DeleteUser.as_view(), name='delete_user'),

    path('change_password/<int:pk>/', ChangePassword.as_view(), name='change_password'),

    path('profile_details/<int:pk>/', ProfileDetails.as_view(), name='profile_details'),
]
