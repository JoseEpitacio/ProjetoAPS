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

class AuthorNestedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id_author', 'author_name')

class BookSerializer(serializers.ModelSerializer):
    authors = AuthorNestedSerializer(many=True)

    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Book
        fields = ('id_book', 'book_name', 'book_genre', 'authors', 'available', 'num_pages', 'book_img', 'comments')
        
    def create(self, validated_data):
        authors_data = validated_data.pop('authors')
        book = Book.objects.create(**validated_data)

        for author_data in authors_data:
            author, created = Author.objects.get_or_create(**author_data)
            book.authors.add(author)

        return book
    
    def update(self, instance, validated_data):
        authors_data = validated_data.pop('authors')
        instance = super().update(instance, validated_data)

        instance.authors.clear()
        for author_data in authors_data:
            author, created = Author.objects.get_or_create(**author_data)
            instance.authors.add(author)
        
        return instance

class AuthorSerializer(serializers.ModelSerializer):
    books = serializers.SerializerMethodField()

    class Meta:
        model = Author
        fields = ('id_author', 'author_name', 'books')
    
    def get_books(self, obj):
        return Book.objects.filter(authors=obj).values_list('book_name')