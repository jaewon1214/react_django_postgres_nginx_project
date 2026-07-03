from django.db import models

class Users(models.Model):
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=255)
    age = models.IntegerField()
    email = models.EmailField()
    city = models.CharField(max_length=50)

    class Meta:
        db_table = 'users'

    def __str__(self):
        return self.username

    @property
    def is_authenticated(self):
        return True

class Products(models.Model):
    product_name = models.CharField(max_length=50)
    color = models.CharField(max_length=50)
    price = models.IntegerField()
    sale_price = models.IntegerField()
    product_category_code = models.CharField(max_length=50)

    class Meta:
        db_table = 'products'

    def __str__(self):
        return self.product_name

    @property
    def is_authenticated(self):
        return True

class Employees(models.Model):
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    job = models.CharField(max_length=50)
    pay = models.IntegerField()

    class Meta:
        db_table = 'employees'

    def __str__(self):
        return self.name

    @property
    def is_authenticated(self):
        return True

class Todos(models.Model):
    subject = models.CharField(max_length=50)
    checked = models.BooleanField(max_length=50)

    class Meta:
        db_table = 'todos'

    def __str__(self):
        return self.subject

    @property
    def is_authenticated(self):
        return True

class Sales(models.Model):
    user_id = models.CharField(max_length=50)
    product_id = models.CharField(max_length=50)
    quantity = models.IntegerField()
    discount_rate = models.FloatField()
    total_price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'sales'

    def __str__(self):
        return self.user_id

    @property
    def is_authenticated(self):
        return True