from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=65, min_length=8, write_only=True)
    email = serializers.EmailField(max_length=255, min_length=4)
    firstName = serializers.CharField(max_length=255, min_length=4)
    lastName = serializers.CharField(max_length=255, min_length=4)

    class Meta:
        model = User
        fields = ['username', 'firstName', 'lastName', 'email', 'password']

    def validateEmail(self, attrs):
        if User.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError({'email', ('E-mail is already in use')})
        return super().validate(attrs)
    
    def create(self, validatedData):
        return User.objects.create_user(validatedData)