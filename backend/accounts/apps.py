from django.apps import AppConfig


class AccountsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'accounts'

    def ready(self):
        # with import django reads automatically all @receiver decorators in the file which under the hood handles .connect() logic
        import accounts.signals