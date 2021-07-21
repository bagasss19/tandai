from django.db import models
from user.models import User
# Create your models here.
class Modelml(models.Model):
    title = models.CharField(max_length=100)
    modelml_url = models.CharField(max_length=100)
    model_owner = models.ForeignKey(User,on_delete=models.CASCADE)