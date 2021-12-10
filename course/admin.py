from django.contrib import admin
from .models import (
    Course, Chapter ,Lesson,ExerciseChoiceAnswer,
    TypeExercise,ExerciseArrange,ExerciseWordMissing,ViolympicEndCourse,
    ImageOfGame,GameWordMemoryCards,GameGoldenFish,
    TypeGame,
)
# Register your models here.
@admin.register(Course)
class CourseModelAdmin(admin.ModelAdmin):
    list_display=['title','price_month','price_quarter','price_year','discounted_price','status']

admin.site.register(Chapter)
admin.site.register(Lesson)

@admin.register(ExerciseChoiceAnswer)
class ExerciseChoiceAnswerModelAdmin(admin.ModelAdmin):
    list_display=['id','lesson','type','num_rows']
 
admin.site.register(TypeExercise)
admin.site.register(TypeGame)
@admin.register(ExerciseArrange)
class ExerciseArrangeModelAdmin(admin.ModelAdmin):
    list_display=['id','lesson','type','num_rows']

@admin.register(ExerciseWordMissing)
class ExerciseWordMissingModelAdmin(admin.ModelAdmin):
    list_display=['id','lesson','type','num_rows']

@admin.register(ViolympicEndCourse)
class ViolympicEndCourseModelAdmin(admin.ModelAdmin):
    list_display=['id','title','course','file_excel']
    
@admin.register(GameWordMemoryCards)
class GameWordMemoryCardsModelAdmin(admin.ModelAdmin):
    list_display=['id','lesson','type']

@admin.register(ImageOfGame)
class ImageOfGameModelAdmin(admin.ModelAdmin):
    list_display=['id','word_memory_card']

@admin.register(GameGoldenFish)
class GameGoldenFishModelAdmin(admin.ModelAdmin):
    list_display=['id','lesson','type','num_rows']
 
    

 