# Generated by Django 3.2.3 on 2022-02-14 14:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0023_alter_forgotpassword_expires'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='Getting_Started',
            field=models.IntegerField(default=2),
        ),
        migrations.AlterField(
            model_name='user',
            name='company',
            field=models.CharField(max_length=255),
        ),
    ]
