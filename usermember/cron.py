from .models import StudentCourse
from datetime import datetime

def my_scheduled_job():
  pass

def update_duration_student_course():
    today = datetime.today().strftime('%Y-%m-%d')
    qs = StudentCourse.objects.all()
    for item in qs:
        today_fm = datetime.strptime(today, '%y-%m-%d').date()
        delta = item.finish_date - today_fm
        days = delta.days
        
        if item.lifetime == True:
            item.duration = "Trọn đời"
           
        else:
            if days < 0:
                item.duration = "Đã hết hạn"
            elif days = 0:
                item.duration = "Hết hạn hôm nay"
            else:
                item.duration = str(days) + " ngày nữa"
        item.save()
            
            
            
    
    