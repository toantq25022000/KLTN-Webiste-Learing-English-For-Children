# Generated by Django 3.0.14 on 2021-11-25 17:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Chapter',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='', max_length=45)),
                ('title_vi', models.CharField(default='', max_length=45)),
            ],
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=45)),
                ('course_img', models.ImageField(upload_to='')),
                ('course_banner', models.ImageField(upload_to='')),
                ('description', models.TextField(default='')),
                ('excerpt', models.TextField(default='', max_length=300)),
                ('price_month', models.DecimalField(decimal_places=0, default=0, max_digits=8)),
                ('price_quarter', models.DecimalField(decimal_places=0, default=0, max_digits=8)),
                ('price_year', models.DecimalField(decimal_places=0, default=0, max_digits=8)),
                ('price_lifetime', models.DecimalField(decimal_places=0, default=0, max_digits=8)),
                ('discounted_price', models.IntegerField(default=0)),
                ('status', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='TypeExercise',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='', max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='TypeGame',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='', max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='ViolympicEndCourse',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='', max_length=60)),
                ('file_excel', models.FileField(upload_to='violympic/')),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='course.Course')),
            ],
        ),
        migrations.CreateModel(
            name='Lesson',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titlesub', models.IntegerField(choices=[(0, ''), (1, 'Letters & Phonics'), (2, 'Numbers'), (3, 'Words'), (4, 'Sentences'), (5, 'Games'), (6, 'Phonics')], default=0)),
                ('titlesub_vi', models.IntegerField(choices=[(0, ''), (1, 'Chữ cái và âm'), (2, 'Chữ số'), (3, 'Từ vựng'), (4, 'Mẫu câu'), (5, 'Trò chơi'), (6, 'Âm')], default=0)),
                ('icon', models.IntegerField(choices=[(0, ''), (1, 'letter_phonic.png'), (2, 'inumber.png'), (3, 'iword.png'), (4, 'isentence.png'), (5, 'igames.png'), (6, 'iphonics.png')], default=0)),
                ('description', models.CharField(default='', max_length=45)),
                ('description_vi', models.CharField(default='', max_length=45)),
                ('video', models.CharField(default='', max_length=150)),
                ('chapter', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='course.Chapter')),
            ],
        ),
        migrations.CreateModel(
            name='ExerciseWordMissing',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file_excel', models.FileField(null=True, upload_to='exercise/word_missing/')),
                ('num_rows', models.PositiveSmallIntegerField(default=0, null=True)),
                ('lesson', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='course.Lesson')),
                ('type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='course.TypeExercise')),
            ],
        ),
        migrations.CreateModel(
            name='ExerciseChoiceAnswer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file_excel', models.FileField(null=True, upload_to='exercise/choice_answer/')),
                ('num_rows', models.PositiveSmallIntegerField(default=0)),
                ('lesson', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='course.Lesson')),
                ('type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='course.TypeExercise')),
            ],
        ),
        migrations.CreateModel(
            name='ExerciseArrange',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file_excel', models.FileField(null=True, upload_to='exercise/word_arrange/')),
                ('num_rows', models.PositiveSmallIntegerField(default=0, null=True)),
                ('lesson', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='course.Lesson')),
                ('type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='course.TypeExercise')),
            ],
        ),
        migrations.AddField(
            model_name='chapter',
            name='course',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='course.Course'),
        ),
    ]
