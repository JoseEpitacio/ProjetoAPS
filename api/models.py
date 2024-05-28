from django.db import models
from django.contrib .auth.models import User
from authentication.serializers import UserSerializer

# Create your models here.
class User(models.Model):
    id = models.IntegerField(max_length=5)
    username = models.CharField(max_length=30)
    first_name = models.CharField(max_length=30)
    last_name = models.Charfield(max_Length=30)
    password = models.CharField(max_length=30, min_length=8)
    cpf = models.IntegerField() #validaçao cpf
    phone_number = models.CharField() #verificar
    contact_picture = models.URLField(nulll=True)#verificar

    def create_user(self):
        return
    
    def delete_user(self):
        return
    
    def edit_user(self):
        return

class Loan(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE) #importando book_name
    id = models.IntegerField(max_length=3)
    date_in = models.CharField(max_length=)#verificar Datefield
    date_out = models.CharField(max_length=)#verificar Datefield
    user = models.ForeignKey(User, on_delete=models.CASCADE) #importando username

    def import_book_name(self):
        return self.book.book_name
    
    def import_username(self):
        return self.user.username

    def check_availability(self):
        return 

class Book(models.Model):
    id = models.IntegerField(max_length=3)
    book_name = models.CharField(max_length=30)
    book_genre = models.CharField(max_length=20)
    author = models.ForeignKey(Author, on_delete=models.CASCADE) #importando author_name
    available = models.BooleanField(default=True)
    num_pages = models.IntegerField(max_length=4)

    def import_author_name(self):
        return self.author.author_name
    
    def create_book(self):
        return
    
    def delete_book(self):
        return
    
    def edit_book(self):
        return
    
    def change_availability(self):
        return

class Author(models.Model):
    id = models.IntegerField(max_length=3)
    author_name = models.CharField(max_length=30)
    book = models.ForeignKey(Book, on_delete=models.CASCADE) #importando book_name

    def import_book_name(self):
        return self.book.book_name
    
    def create_author(self):
        return
    
    def delete_author(self):
        return
    
    def edit_author(self):
        return
    
class Comment(models.Model):
    id = models.IntegerField(max_length=3)
    user = models.ForeignKey(User, on_delete=models.CASCADE) #importando username
    book = models.ForeignKey(Book, on_delete=models.CASCADE) #importando book_name
    content = models.CharField(max_length=250) #verificar length

    def import_username(self):
        return self.user.username
    
    def import_book_name(self):
        return self.book.book_name
    
    def create_comment(self):
        return
    
    def delete_comment(self):
        return
    
    def edit_comment(self):
        return
    











