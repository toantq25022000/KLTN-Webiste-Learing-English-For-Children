from django.db import models
from course.models import (
    Course,Chapter,Lesson,TypeExercise,TypeGame
)
from django.core.validators import  MaxValueValidator, MinValueValidator 
from django.contrib.auth.models import AbstractUser
# Create your models here.

class MyUser(AbstractUser):
    sex_choice = ((0,"Nữ"), (1,"Nam"))
    sex = models.IntegerField(choices=sex_choice,default=0,null=True)
    birth_date = models.DateField(null=True)
    phone_number = models.CharField(default='',max_length=15,null=True)
    address = models.CharField(default='',max_length=255,null=True)
    std_img = models.ImageField(default='user/image-student/hinh-anh-gai-xinh-de-thuong-nhat-1.jpg',upload_to='user/image-student/')
  
class Student(models.Model):
    user = models.ForeignKey(MyUser,on_delete=models.CASCADE)
    id_student = models.CharField(default='',max_length= 10, unique=True)
    
    def __str__(self):
        return f"{self.id_student} of {self.user.username}"
    
class StudentCourse(models.Model):
    user = models.ForeignKey(MyUser,on_delete=models.CASCADE)
    course = models.ForeignKey(Course,on_delete=models.CASCADE)
    start_date = models.DateField()
    finish_date = models.DateField()
    
    lifetime = models.BooleanField(default=False)
    def __str__(self):
        return f"{self.user.username} of {self.course.title}"
    

class Teacher(models.Model):
    user = models.ForeignKey(MyUser,on_delete=models.CASCADE)
    course = models.ForeignKey(Course,on_delete=models.CASCADE,null=True,blank=True)
    fullname = models.CharField(default='',max_length=100)
    title = models.CharField(default='',max_length=100)
    phone = models.CharField(default='',max_length=15)
    email = models.CharField(default='',max_length=75)
    link_video = models.CharField(default='',max_length=255,null=True,blank=True)
    link_fb = models.CharField(default='',max_length=150)
    address = models.CharField(default='',max_length=150)
    experience = models.TextField(default='')
    account_number = models.CharField(default='',max_length=25)
    coefficients_salary = models.FloatField(default=0,validators=[MinValueValidator(0.0), MaxValueValidator(12.0)])
    salary = models.DecimalField(default=0,max_digits=8, decimal_places=0)
    active = models.BooleanField(default=False)

    def __str__(self):
        return self.fullname

class TypeScore(models.Model):
    title = models.CharField(default='',max_length=45)

    def __str__(self):
        return self.title

class ScoreStudent(models.Model):
    user = models.ForeignKey(MyUser,on_delete=models.CASCADE)
    course = models.ForeignKey(Course,on_delete=models.CASCADE)
    lesson =  models.ForeignKey(Lesson,on_delete=models.CASCADE,null=True)
    type_exercise = models.ForeignKey(TypeExercise,on_delete=models.CASCADE,null=True,blank=True)
    type_game = models.ForeignKey(TypeGame,on_delete=models.CASCADE,null=True,blank=True)
    score = models.PositiveIntegerField(default=0)
    type_score = models.ForeignKey(TypeScore,on_delete=models.CASCADE)

class ScoreViolympicFinishCourse(models.Model):
    user = models.ForeignKey(MyUser,on_delete=models.CASCADE)
    course = models.ForeignKey(Course,on_delete=models.CASCADE)
    time_start = models.DateTimeField()
    time_finish = models.DateTimeField()
    score = models.PositiveIntegerField(default=0)
    

    
    