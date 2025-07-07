from django.urls import path
from .views import (
    CodeConverterView,
    register_user,
    CustomTokenObtainPairView,  # ✅ MUST come from your app
    list_users,
    toggle_user_status,
    test_view
)

urlpatterns = [
    path('convert/', CodeConverterView.as_view(), name='code_convert'),
    path('register/', register_user, name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='custom_token_obtain_pair'),
    path('api/admin/users/', list_users, name='admin_list_users'),
    path('api/admin/toggle-user/<int:user_id>/', toggle_user_status, name='toggle_user_status'),
    path('test/', test_view, name='test'),
]
