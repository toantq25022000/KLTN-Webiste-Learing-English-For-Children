# Generated by Django 3.0.14 on 2022-01-01 18:54

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usermember', '0011_teacher_coefficients_salary'),
    ]

    operations = [
        migrations.AlterField(
            model_name='teacher',
            name='coefficients_salary',
            field=models.FloatField(default=0, validators=[django.core.validators.MinValueValidator(0.0), django.core.validators.MaxValueValidator(12.0)]),
        ),
    ]
