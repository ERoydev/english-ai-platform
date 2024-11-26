from django.contrib import admin
from .models import AccountUser, Profile


@admin.register(AccountUser)
class AccountUserAdmin(admin.ModelAdmin):
    list_display = ['email', 'is_staff', 'is_active', 'last_login']
    list_filter = ['email', 'is_staff']
    search_fields = ['email']

    list_per_page = 50

    fieldsets = (
        ('Credentials',
        {'fields': ['email', 'password']}),

        ('Information',
        {'fields': ['is_active', 'date_joined', 'last_login']}),

        ('Permissions',
        {'fields': ['groups', 'user_permissions', 'is_superuser', 'is_staff']}),
    )


