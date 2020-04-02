from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import UserProfile, Category


class UserSerializer(serializers.ModelSerializer):
    """User model serializer."""

    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class RegisterSerializer(serializers.ModelSerializer):
    """Register serializer."""

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user


class LoginSerializer(serializers.Serializer):
    """Login serializer."""
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


class UserProfileSerializer(serializers.ModelSerializer):
    """User Profile model serializer."""

    class Meta:
        model = UserProfile
        fields = '__all__'
        extra_kwargs = {
            'id': {'required': False},
            'email': {'required': False},
        }


class CategorySerializer(serializers.ModelSerializer):
    """Category model serializer."""
    class Meta:
        model = Category
        fields = '__all__'