# Generated by Django 3.2.3 on 2021-09-07 14:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modelml', '0006_localmodelstat'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='modelml',
            name='created',
        ),
        migrations.RemoveField(
            model_name='modelml',
            name='statictics_fn',
        ),
        migrations.RemoveField(
            model_name='modelml',
            name='updated',
        ),
        migrations.AddField(
            model_name='modelml',
            name='statistics_fn',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='modelml',
            name='statistics_f1',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='modelml',
            name='statistics_fp',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='modelml',
            name='statistics_precision',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='modelml',
            name='statistics_recall',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='modelml',
            name='statistics_test_acc',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='modelml',
            name='statistics_test_loss',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='modelml',
            name='statistics_tn',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='modelml',
            name='statistics_tp',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='modelml',
            name='statistics_train_acc',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='modelml',
            name='statistics_train_loss',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='modelml',
            name='training_endtime',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='modelml',
            name='training_starttime',
            field=models.DateField(blank=True, null=True),
        ),
    ]
