from django.db import models
from user.models import User
# Create your models here.
class Modelml(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=255, null=True)
    modelml_url = models.FileField(blank=False, null=False)
    base_model = models.CharField(max_length=100, null=True)
    model_owner = models.ForeignKey(User,on_delete=models.CASCADE)
    status = models.CharField(max_length=100,null=True)
    statistics_tp = models.CharField(max_length=100,null=True)
    statistics_fp = models.CharField(max_length=100,null=True)
    statistics_tn = models.CharField(max_length=100,null=True)
    statictics_fn = models.CharField(max_length=100,null=True)
    statistics_f1 = models.CharField(max_length=100,null=True)
    statistics_precision = models.CharField(max_length=100,null=True)
    statistics_recall = models.CharField(max_length=100,null=True)
    statistics_train_acc = models.CharField(max_length=100,null=True)
    statistics_train_loss = models.CharField(max_length=100,null=True)
    statistics_test_acc = models.CharField(max_length=100,null=True)
    statistics_test_loss = models.CharField(max_length=100,null=True)
    created = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now=True)
    training_starttime = models.DateTimeField(auto_now=True)
    training_endtime = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['id']