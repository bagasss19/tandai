# Generated by Django 3.2.3 on 2021-08-09 14:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0012_auto_20210726_0715'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='package',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='user.package'),
        ),
    ]
