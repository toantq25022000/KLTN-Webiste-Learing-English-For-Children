# Generated by Django 3.0.14 on 2021-11-25 20:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usermember', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='id_student',
            field=models.CharField(default='', max_length=10, null=True),
        ),
    ]