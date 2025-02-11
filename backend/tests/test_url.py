from django.test import SimpleTestCase
from django.urls import resolve, reverse
from speech_analysis.views import AnalyzeAudioView
from accounts.views import LoginView, LogoutView, ChangePassword, GetUserDetails, SignupView, TestTokenView, DeleteUser


class TestUrls(SimpleTestCase):

    def test_speech_analysis_url_is_resolved(self):
        url = reverse('analyze_audio')
        self.assertEqual(resolve(url).func.view_class, AnalyzeAudioView)

    def test_accounts_login_url_is_resolved(self):
        url = reverse('login')
        self.assertEqual(resolve(url).func.view_class, LoginView)

    def test_accounts_logout_url_is_resolved(self):
        url = reverse('logout')
        self.assertEqual(resolve(url).func.view_class, LogoutView)

    def test_accounts_change_password_url_is_resolved(self):
        url = reverse('change_password', kwargs={'pk': 1})
        self.assertEqual(resolve(url).func.view_class, ChangePassword)

    def test_accounts_delete_user_is_resolved(self):
        url = reverse('delete_user', kwargs={'pk': 1})
        self.assertEqual(resolve(url).func.view_class, DeleteUser)

    def test_accounts_get_user_details_is_resolved(self):
        url = reverse('get_user_by_token')
        self.assertEqual(resolve(url).func.view_class, GetUserDetails)

    def test_accounts_sign_up_url_is_resolved(self):
        url = reverse('signup')
        self.assertEqual(resolve(url).func.view_class, SignupView)

    def test_accounts_test_token_url_is_resolved(self):
        url = reverse('test_token')
        self.assertEqual(resolve(url).func.view_class, TestTokenView)

