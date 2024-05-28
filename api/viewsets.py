from rest_framework import viewsets
from api import serializers, models

class UserViewset(viewsets.ModelViewSet):
    serializer_class = serializers.UserSerializer
    queryset = models.User.objects.all()

class LoanViewset(viewsets.ModelViewSet):
    serializer_class = serializers.LoanSerializer
    queryset = models.User.objects.all()

class BookViewset(viewsets.ModelViewSet):
    serializer_class = serializers.BookSerializer
    queryset = models.User.objects.all()

class AuthorViewset(viewsets.ModelViewSet):
    serializer_class = serializers.AuthorSerializer
    queryset = models.User.objects.all()

class CommentViewset(viewsets.ModelViewSet):
    serializer_class = serializers.CommentSerializer
    queryset = models.User.objects.all()


