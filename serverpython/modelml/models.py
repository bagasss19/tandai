from django.db import models
from user.models import User
# Create your models here.
class Modelml(models.Model):
    model_name = models.CharField(max_length=100, null=True)
    model_ID = models.CharField(max_length=255, null=True, unique=True)
    baseline_ID = models.CharField(max_length=100, null=True)
    model_owner = models.ForeignKey(User,on_delete=models.CASCADE)
    status = models.CharField(max_length=100,null=True)
    training_starttime = models.DateTimeField(blank=True, null=True)
    training_endtime = models.DateTimeField(blank=True, null=True)
    statistics_tp = models.FloatField(blank=True, null=True)
    statistics_fp = models.FloatField(blank=True, null=True)
    statistics_tn = models.FloatField(blank=True, null=True)
    statistics_fn = models.FloatField(blank=True, null=True)
    statistics_f1 = models.FloatField(blank=True, null=True)
    statistics_precision = models.FloatField(blank=True, null=True)
    statistics_recall = models.FloatField(blank=True, null=True)
    statistics_train_acc = models.FloatField(blank=True, null=True)
    statistics_train_loss = models.FloatField(blank=True, null=True)
    statistics_test_acc = models.FloatField(blank=True, null=True)
    statistics_test_loss = models.FloatField(blank=True, null=True)
    loss_image = models.ImageField(blank=True, null=True)
    accuracy_image = models.ImageField(blank=True, null=True)
    csv = models.FileField(blank=True, null=True)

    class Meta:
        ordering = ['id']

class Modeldefault(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=255, null=True)
    modelml_url = models.FileField(blank=False, null=False)
    base_model = models.CharField(max_length=100, null=True)
    model_owner = models.ForeignKey(User,on_delete=models.CASCADE)
    status = models.CharField(max_length=100,null=True)

    class Meta:
        ordering = ['id']

class LocalModelstat(models.Model):
    userid = models.CharField(db_column='userID', primary_key=True, max_length=100)  # Field name made lowercase.
    modelid = models.CharField(db_column='modelID', max_length=100, blank=True, null=True)  # Field name made lowercase.
    baseid = models.CharField(db_column='baseID', max_length=100, blank=True, null=True)  # Field name made lowercase.
    modelname = models.CharField(db_column='modelName', max_length=100, blank=True, null=True)  # Field name made lowercase.
    model_owner = models.ForeignKey(User,on_delete=models.CASCADE)
    status = models.IntegerField(blank=True, null=True)
    training_starttime = models.DateField(blank=True, null=True)
    training_endtime = models.DateField(blank=True, null=True)
    statistics_tp = models.FloatField(blank=True, null=True)
    statistics_fp = models.FloatField(blank=True, null=True)
    statistics_tn = models.FloatField(blank=True, null=True)
    statistics_fn = models.FloatField(blank=True, null=True)
    statistics_f1 = models.FloatField(blank=True, null=True)
    statistics_precision = models.FloatField(blank=True, null=True)
    statistics_recall = models.FloatField(blank=True, null=True)
    statistics_train_acc = models.FloatField(blank=True, null=True)
    statistics_train_loss = models.FloatField(blank=True, null=True)
    statistics_test_acc = models.FloatField(blank=True, null=True)
    statistics_test_loss = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'local_modelstat'

class Review(models.Model):
    review = models.CharField(max_length=255, null=True)
    sent = models.CharField(max_length=100, null=True)
    sent_pred = models.CharField(max_length=100, null=True)
    owner = models.ForeignKey(Modelml,on_delete=models.CASCADE)

    class Meta:
        ordering = ['id'] 
    
