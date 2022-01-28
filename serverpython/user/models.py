from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, UserManager
from django.utils import timezone
# Create your models here.
class Package(models.Model):
    title = models.CharField(max_length=100)
    API_quota = models.IntegerField(default=0)
    TF_quota = models.IntegerField(default=0)

class User(AbstractBaseUser):
    username = models.CharField(
        max_length=50
    )
    email = models.EmailField(
        max_length=255,
        unique=True
        )
    company = models.EmailField(
        max_length=255,
    )
    password = models.CharField(max_length=100)
    is_staff = models.BooleanField(
        default=False
    )
    is_superuser = models.BooleanField(
        default=False
    )
    API_usage = models.IntegerField(default=0)
    TF_usage = models.IntegerField(default=0)
    package = models.ForeignKey(Package,on_delete=models.CASCADE, default=1)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'password']
    objects = UserManager()

    def __str__(self):
        """A string representation of the model."""
        return self.username

def ten_minute_hence():
   return timezone.now() + timezone.timedelta(minutes=10)
   
class ForgotPassword(models.Model):
    code = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    Expires = models.DateTimeField(default=ten_minute_hence())
