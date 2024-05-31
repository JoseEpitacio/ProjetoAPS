from django.contrib import admin
from .models import Book, Loan, Author

admin.site.register(Book)
admin.site.register(Loan)
admin.site.register(Author)
