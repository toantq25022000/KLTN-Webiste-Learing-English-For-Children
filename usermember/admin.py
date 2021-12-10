from django.contrib import admin
from .models import Student, Teacher ,TypeScore,ScoreStudent,ScoreViolympicFinishCourse,StudentCourse
from .models import MyUser
# Register your models here.
admin.site.register(MyUser)
admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(TypeScore)

@admin.register(ScoreStudent)
class ScoreStudentModelAdmin(admin.ModelAdmin):
    list_display=['user','lesson','type_exercise','type_game','score','type_score']
    list_filter = ['type_exercise','type_game','type_score']

@admin.register(ScoreViolympicFinishCourse)
class ScoreViolympicFinishCourseModelAdmin(admin.ModelAdmin):
    list_display=['user','course','time_start','time_finish','score']

@admin.register(StudentCourse)
class StudentCourseModelAdmin(admin.ModelAdmin):
    list_display=['user','course','start_date','finish_date','lifetime']
    list_filter = ['finish_date','lifetime','course']
    
    
    


    

