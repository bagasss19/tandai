# Generated by Django 3.2.3 on 2021-08-28 13:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modelml', '0004_modelml_created'),
    ]

    operations = [
        migrations.AddField(
            model_name='modelml',
            name='base_model',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='modelml',
            name='statictics_fn',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='modelml',
            name='statistics_f1',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='modelml',
            name='statistics_fp',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='modelml',
            name='statistics_precision',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='modelml',
            name='statistics_recall',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='modelml',
            name='statistics_test_acc',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='modelml',
            name='statistics_test_loss',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='modelml',
            name='statistics_tn',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='modelml',
            name='statistics_tp',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='modelml',
            name='statistics_train_acc',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='modelml',
            name='statistics_train_loss',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='modelml',
            name='status',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='modelml',
            name='training_endtime',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='modelml',
            name='training_starttime',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='modelml',
            name='updated',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
