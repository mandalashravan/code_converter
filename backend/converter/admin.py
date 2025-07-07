from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'is_active', 'is_staff')
    list_filter = ('is_active', 'is_staff')

    # No need to add 'is_active' again — it's already included in fieldsets

admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
