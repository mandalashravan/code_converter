import re
import os
from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import openai
from openai import OpenAI

from .serializers import CodeConversionSerializer, UserSerializer

# OpenAI setup
openai.api_key = settings.OPENAI_API_KEY
client = OpenAI(api_key=settings.OPENAI_API_KEY)

# ✅ Code Converter API
class CodeConverterView(APIView):
    def post(self, request):
        serializer = CodeConversionSerializer(data=request.data)
        if serializer.is_valid():
            source = serializer.validated_data['source_code']
            src_lang = serializer.validated_data['source_lang']
            tgt_lang = serializer.validated_data['target_lang']
            custom_prompt = request.data.get('prompt', '').strip()

            if src_lang.strip().lower() == tgt_lang.strip().lower():
                return Response({
                    "output_code": f"Error: Source and target languages are the same ({src_lang})."
                }, status=200)

            prompt = (
                f"You are a programming language code converter and validator.\n\n"
                f"Instructions:\n"
                f"1. Always assume the input is written in {src_lang} and must be converted to {tgt_lang}.\n"
                f"2. Convert the code from {src_lang} to fully working {tgt_lang} code.\n"
                f"3. If the code has syntax or logic errors in {src_lang}, reply only with an error message.\n"
                f"4. Do NOT return markdown formatting like triple backticks or language names.\n\n"
                f"Input code:\n{source}"
            )

            if custom_prompt:
                prompt += f"\n\nUser prompt: {custom_prompt}"

            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                temperature=0
            )

            converted_code = response.choices[0].message.content.strip()
            converted_code = re.sub(r"^```[\w+\s]*\n?", "", converted_code)
            converted_code = re.sub(r"\n?```$", "", converted_code)

            return Response({"output_code": converted_code})

        return Response(serializer.errors, status=400)


# ✅ Registration with inactive status
@api_view(['POST'])
def register_user(request):
    name = request.data.get('name')
    email = request.data.get('email')
    password = request.data.get('password')

    if not name or not email or not password:
        return Response({'error': 'All fields are required.'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=email).exists():
        return Response({'error': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)

    User.objects.create_user(
        username=email,
        first_name=name,
        email=email,
        password=password,
        is_active=False
    )

    return Response({'message': 'User registered successfully. Awaiting admin approval.'}, status=status.HTTP_201_CREATED)



from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework.exceptions import AuthenticationFailed

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Embed extra fields into the token
        token['username'] = user.username
        token['is_staff'] = user.is_staff
        token['admin'] = user.username == "shravan"  # ✅ Admin check

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        if not self.user.is_active:
            raise AuthenticationFailed("Your account is not activated.")

        # Include "admin" flag in the response payload as well
        data['admin'] = self.user.username == "shravan"  # ✅ Return with response

        return data



class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


# ✅ Admin API - list all users
@api_view(['GET'])
@permission_classes([IsAdminUser])
def list_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


# ✅ Admin API - toggle is_active status
@api_view(['POST'])
@permission_classes([IsAdminUser])
def toggle_user_status(request, user_id):
    try:
        user = User.objects.get(pk=user_id)
        user.is_active = not user.is_active
        user.save()
        return Response({'message': f'User {user.username} is now {"active" if user.is_active else "inactive"}.'})
    except User.DoesNotExist:
        return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)


# Optional test view
def test_view(request):
    return render(request, 'test.html')
