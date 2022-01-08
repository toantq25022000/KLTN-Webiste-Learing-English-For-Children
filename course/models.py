from django.db import models
from django.core.validators import  MaxValueValidator, MinValueValidator 
from django.urls import reverse
import xlrd
from django.conf import settings
# Create your models here.

class Course(models.Model):
    title = models.CharField(max_length=45)
    course_img = models.ImageField()
    course_banner = models.ImageField()
    description = models.TextField(default='')
    excerpt = models.TextField(default='',max_length=300)
    price_month = models.DecimalField(default=0,max_digits=8, decimal_places=0)
    price_quarter = models.DecimalField(default=0,max_digits=8, decimal_places=0)
    price_year = models.DecimalField(default=0,max_digits=8, decimal_places=0)
    price_lifetime = models.DecimalField(default=0,max_digits=8, decimal_places=0)
    discounted_price = models.IntegerField(default=0)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.title
    def get_add_to_cart_url(self):
        return reverse("course:add-to-cart", kwargs = {
            'course_id':self.id
        })



class Chapter(models.Model):
    course = models.ForeignKey(Course,on_delete=models.CASCADE)
    title = models.CharField(default='',max_length=45)
    title_vi = models.CharField(default='',max_length=45)

    def __str__(self):
        return '%s ,--- %s' % (self.course.title,self.title)
class Lesson(models.Model):
    titlesub_choice = ((0,""),(1,"Letters & Phonics"), (2,"Numbers"),(3,"Words"),(4,"Sentences"),(5,"Games"),(6,"Phonics"))
    titlesub_vi_choice = ((0,""),(1,"Chữ cái và âm"), (2,"Chữ số"),(3,"Từ vựng"),(4,"Mẫu câu"),(5,"Trò chơi"),(6,"Âm"))
    icon_choice = ((0,""),(1,"letter_phonic.png"), (2,"inumber.png"),(3,"iword.png"),(4,"isentence.png"),(5,"igames.png"),(6,"iphonics.png"))
    
    chapter = models.ForeignKey(Chapter,on_delete=models.CASCADE,null=True)
    titlesub = models.IntegerField(choices=titlesub_choice,default=0)
    titlesub_vi = models.IntegerField(choices=titlesub_vi_choice,default=0)
    icon = models.IntegerField(choices=icon_choice,default=0)
    description = models.CharField(default='',max_length=45)
    description_vi = models.CharField(default='',max_length=45)
    video = models.CharField(default='',max_length=150)
    def __str__(self):
        return '%s ,--- %s ,---%s,' % (self.chapter.course.title,self.chapter.title,self.get_titlesub_display())


class TypeGame(models.Model):
    title = models.CharField(default='',max_length=50)

    def __str__(self):
        return self.title


class ImageOfGame(models.Model):
    img = models.ImageField(upload_to='game/memory_word_card/')

    def __str__(self):
        return self.img.url

class GameWordMemoryCards(models.Model):
    lesson = models.ForeignKey(Lesson,on_delete=models.CASCADE)
    type = models.ForeignKey(TypeGame,on_delete=models.CASCADE)
    imgs = models.ManyToManyField(ImageOfGame)
    def __str__(self):
        return f"Game card of {self.lesson}"

class GameGoldenFish(models.Model):
    lesson = models.ForeignKey(Lesson,on_delete=models.CASCADE)
    type = models.ForeignKey(TypeGame,on_delete=models.CASCADE)
    file_excel =  models.FileField(upload_to='game/golden_fish/', max_length=100)
    num_rows = models.PositiveSmallIntegerField(default=0)

    def __str__(self):
        return f"Game golden fish of {self.lesson}"

    # overise save
    def save(self, *args, **kwargs):
        super(GameGoldenFish, self).save(*args, **kwargs) 
        data= xlrd.open_workbook(settings.BASE_DIR + self.file_excel.url) #open a file
        table = data.sheet_by_index(0) #Get a worksheet
        nrows = table.nrows #Rows
        ncols = table.ncols 
        self.num_rows = nrows - 1
        super().save(*args, **kwargs)  
  
class TypeExercise(models.Model):
    title = models.CharField(default='',max_length=50)
    

    def __str__(self):
        return self.title


class ExerciseChoiceAnswer(models.Model):
    lesson = models.ForeignKey(Lesson,on_delete=models.CASCADE)
    type = models.ForeignKey(TypeExercise,on_delete=models.CASCADE)
    file_excel =  models.FileField(upload_to='exercise/choice_answer/', max_length=100,null=True)
    num_rows = models.PositiveSmallIntegerField(default=0)
       
    def __str__(self):
        return '%s ,--- %s ,---%s : %s' % (self.lesson.chapter.course.title,self.lesson.chapter.title,self.lesson.get_titlesub_display(),self.type.title)
    
    # overise save
    def save(self, *args, **kwargs):
        super(ExerciseChoiceAnswer, self).save(*args, **kwargs) 
        data= xlrd.open_workbook(settings.BASE_DIR + self.file_excel.url) #open a file
        table = data.sheet_by_index(0) #Get a worksheet
        nrows = table.nrows #Rows
        ncols = table.ncols 
        self.num_rows = nrows - 1
        super().save(*args, **kwargs)  


class ExerciseArrange(models.Model):
    lesson = models.ForeignKey(Lesson,on_delete=models.CASCADE)
    type = models.ForeignKey(TypeExercise,on_delete=models.CASCADE)
    file_excel =  models.FileField(upload_to='exercise/word_arrange/', max_length=100,null=True)
    num_rows = models.PositiveSmallIntegerField(default=0,null=True)
       
   
    
    # overise save
    def save(self, *args, **kwargs):
        super(ExerciseArrange, self).save(*args, **kwargs) 
        data= xlrd.open_workbook(settings.BASE_DIR + self.file_excel.url) #open a file
        table = data.sheet_by_index(0) #Get a worksheet
        nrows = table.nrows #Rows
        ncols = table.ncols 
        self.num_rows = nrows - 1
        super().save(*args, **kwargs)

    def __str__(self):
        return '%s ,--- %s ,---%s : %s' % (self.lesson.chapter.course.title,self.lesson.chapter.title,self.lesson.get_titlesub_display(),self.type.title)
    
    
class ExerciseWordMissing(models.Model):
    lesson = models.ForeignKey(Lesson,on_delete=models.CASCADE)   
    type = models.ForeignKey(TypeExercise,on_delete=models.CASCADE)
    file_excel =  models.FileField(upload_to='exercise/word_missing/', max_length=100,null=True)
    num_rows = models.PositiveSmallIntegerField(default=0,null=True)
    def __str__(self):
        return '%s ,--- %s ,---%s : %s' % (self.lesson.chapter.course.title,self.lesson.chapter.title,self.lesson.get_titlesub_display(),self.type.title)
    
    # overise save
    def save(self, *args, **kwargs):
        super(ExerciseWordMissing, self).save(*args, **kwargs) 
        data= xlrd.open_workbook(settings.BASE_DIR + self.file_excel.url) #open a file
        table = data.sheet_by_index(0) #Get a worksheet
        nrows = table.nrows #Rows
        ncols = table.ncols 
        self.num_rows = nrows - 1
        super().save(*args, **kwargs)
  

class ViolympicEndCourse(models.Model):
    title = models.CharField(default='',max_length=60)
    course = models.ForeignKey(Course,on_delete=models.CASCADE)
    file_excel =  models.FileField(upload_to='violympic/', max_length=100)

    def __str__(self):
        return '%s -- %s' % (self.title,self.course.title)





