from rest_framework import viewsets, status
from rest_framework.response import Response
from api import serializers, models
from .models import Book
from django.shortcuts import get_object_or_404

class AuthorViewset(viewsets.ModelViewSet):
    serializer_class = serializers.AuthorSerializer
    queryset = models.Author.objects.all()

class BookViewset(viewsets.ModelViewSet):
    serializer_class = serializers.BookSerializer
    queryset = models.Book.objects.all()

class LoanViewset(viewsets.ModelViewSet):
    serializer_class = serializers.LoanSerializer
    queryset = models.Loan.objects.all()

    def create(self, request, *args, **kwargs):
        book_id = request.data.get('id_book')
        book = get_object_or_404(Book, id_book=book_id)

        if not book.available:
            return Response({'message': 'Este livro não está disponível'}, status=status.HTTP_400_BAD_REQUEST)

        data = request.data.copy()
        data['user'] = request.user.id
        data['book'] = book.id_book
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        book.available = False
        book.save()

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def destroy(self, request, *args, **kwargs):
        loan = self.get_object()
        loan.book.available = True
        loan.book.save()
        return super().destroy(request, *args, **kwargs)

class CommentViewset(viewsets.ModelViewSet):
    serializer_class = serializers.CommentSerializer
    queryset = models.Comment.objects.all()


