# Generated by Django 3.2.3 on 2021-08-16 06:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modelml', '0003_auto_20210809_1451'),
    ]

    operations = [
        migrations.AddField(
            model_name='modelml',
            name='created',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
