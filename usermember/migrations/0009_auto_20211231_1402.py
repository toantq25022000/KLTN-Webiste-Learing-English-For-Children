# Generated by Django 3.0.14 on 2021-12-31 07:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usermember', '0008_auto_20211231_1321'),
    ]

    operations = [
        migrations.AlterField(
            model_name='teacher',
            name='experience',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='link_video',
            field=models.CharField(default='', max_length=255, null=True),
        ),
    ]