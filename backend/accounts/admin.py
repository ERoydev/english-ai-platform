from django.contrib import admin
from .models import AccountUser, Profile

@admin.register(AccountUser)
class AccountUserAdmin(admin.ModelAdmin):
    pass