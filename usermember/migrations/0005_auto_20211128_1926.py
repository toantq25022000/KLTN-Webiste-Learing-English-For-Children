# Generated by Django 3.0.14 on 2021-11-28 12:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usermember', '0004_auto_20211126_2318'),
    ]

    operations = [
        migrations.AlterField(
            model_name='myuser',
            name='std_img',
            field=models.ImageField(default='noavatar.gif', upload_to='user/image-student/'),
        ),
    ]
