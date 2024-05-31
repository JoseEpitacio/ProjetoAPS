from rest_framework import serializers
from .models import Book, Author, Comment, Loan
from authentication.models import User

'''class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = '__all__'
'''

class LoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    comment_date = serializers.DateTimeField(format='%d/%m/%Y %H:%M:%S', read_only=True)

    class Meta:
        model = Comment
        fields = ('id_comment', 'content', 'comment_date', 'book', 'user', 'username')

class BookSerializer(serializers.ModelSerializer):
    authors = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='author_name'
    )

    authors_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Author.objects.all(),
        source='authors',
        write_only=True
    )

    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Book
        fields = ('id_book', 'book_name', 'book_genre', 'authors', 'authors_ids', 'available', 'num_pages', 'book_img', 'comments')

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'