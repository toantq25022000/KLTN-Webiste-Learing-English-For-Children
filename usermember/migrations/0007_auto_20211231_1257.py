# Generated by Django 3.0.14 on 2021-12-31 05:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0006_auto_20211231_1257'),
        ('usermember', '0006_auto_20211204_1931'),
    ]

    operations = [
        migrations.AddField(
            model_name='teacher',
            name='active',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='teacher',
            name='address',
            field=models.CharField(default='', max_length=150),
        ),
        migrations.AddField(
            model_name='teacher',
            name='email',
            field=models.CharField(default='', max_length=75),
        ),
        migrations.AddField(
            model_name='teacher',
            name='experience',
            field=models.CharField(default='', max_length=150),
        ),
        migrations.AddField(
            model_name='teacher',
            name='fullname',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='teacher',
            name='link_fb',
            field=models.CharField(default='', max_length=150),
        ),
        migrations.AddField(
            model_name='teacher',
            name='link_video',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='teacher',
            name='phone',
            field=models.CharField(default='', max_length=15),
        ),
        migrations.AddField(
            model_name='teacher',
            name='title',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='course',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='course.Course'),
        ),
    ]
