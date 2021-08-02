from django.db import models
from user.models import User
# Create your models here.
class Modelml(models.Model):
    title = models.CharField(max_length=100)
    modelml_url = models.FileField(blank=False, null=False)
    model_owner = models.ForeignKey(User,on_delete=models.CASCADE)

    class Meta:
        ordering = ['id']