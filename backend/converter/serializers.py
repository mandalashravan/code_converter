from rest_framework import serializers
from django.contrib.auth.models import User

# 🔁 For code conversion API
class CodeConversionSerializer(serializers.Serializer):
    source_code = serializers.CharField()
    source_lang = serializers.CharField()
    target_lang = serializers.CharField()

# 🔁 For admin dashboard: user listing and status toggle
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'is_active']

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # ✅ Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['is_staff'] = user.is_staff
        return token
