# Generated by Django 3.0.14 on 2021-12-12 07:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('competition', '0002_auto_20211211_2047'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='roomcompetition',
            name='course',
        ),
        migrations.AddField(
            model_name='roomcompetition',
            name='class_compete',
            field=models.IntegerField(choices=[(3, 'Lớp 3'), (4, 'Lớp 4'), (5, 'Lớp 5'), (6, 'Lớp 6'), (7, 'Lớp 7'), (8, 'Lớp 8')], default=3),
        ),
    ]
