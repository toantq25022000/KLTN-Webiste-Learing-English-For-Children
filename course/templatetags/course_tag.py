from django import template
from course.models import (
    Course,Chapter, Lesson,ExerciseChoiceAnswer,
    TypeExercise,ExerciseArrange,ExerciseWordMissing,
)
from usermember.models import (
    ScoreStudent
)

from order.models import (
    Order,OrderItem
)
from decimal import *
from datetime import datetime,date
register = template.Library()


@register.filter
def cart_view(user):
    order_item = OrderItem.objects.filter(user=user,purchased=False)
    if order_item.exists():
        return order_item
    else:
        return None

@register.filter
def cart_total(user):
    order = Order.objects.filter(user=user,ordered=False)
    if order.exists():
        return order[0].get_totals()
    else:
        return 0
@register.filter
def cart_count(user):
    order = Order.objects.filter(user=user,ordered=False)
    if order.exists():
        return order[0].items.count()
    else:
        return 0

@register.simple_tag
def list_order_item(orderId):
    order = Order.objects.filter(id=orderId)
    if order.exists():
        order = order[0]
        return order.items.all()
    else:
        return None

@register.simple_tag(name="day_left")
def day_left(finish_date):
    # date_finish =  datetime.strptime(finish_date, "%y-%m-%d")
    date_now = datetime.now().strftime(("%y-%m-%d"))
    date_now_format = datetime.strptime(date_now, '%y-%m-%d').date()
    delta =finish_date - date_now_format
    days = delta.days
    
    return days

@register.simple_tag(name="discounted_price_course")
def discounted_price_course(value1,value2):
    kq = value1 - (value1*value2)/100
    return kq

@register.simple_tag(name="chapter_of_course")
def chapter_of_course(courseId):
    return Chapter.objects.filter(course_id = courseId)

@register.simple_tag(name="lesson_of_chapter")
def lesson_of_chapter(value):
    return Lesson.objects.filter(chapter_id = value)


@register.simple_tag(name="get_exercise_choice")
def get_exercise_choice(id):
    qs = ExerciseChoiceAnswer.objects.filter(lesson_id = id)
    if qs:
        return qs[0]
    return None

@register.simple_tag(name="get_exercise_missing_word")
def get_exercise_missing_word(id):
    qs = ExerciseWordMissing.objects.filter(lesson_id = id)
    if qs:
        return qs[0]
    return None

@register.simple_tag(name="get_exercise_arrange")
def get_exercise_arrange(id):
    qs = ExerciseArrange.objects.filter(lesson_id = id)
    if qs:
        return qs[0]
    return None

@register.simple_tag(name="count_sum_time")
def count_sum_time(value1,value2):
    sumTimeCount = (value1 - value2).seconds
    return sumTimeCount



@register.simple_tag(name="persent_progress_chapter")
def persent_progress_chapter(userId,courseId,chapterId):
    return ''

@register.simple_tag(name="sumTotalScoretypeExercise")
def sumTotalScoretypeExercise(typeId,lessId):
    if typeId == 1:
        get__choice = ExerciseChoiceAnswer.objects.filter(type_id=1,lesson_id=lessId)
        if get__choice:
            obj = get__choice[0]
            return obj.num_rows * 10
       
    if typeId == 2:
        get_miss = ExerciseWordMissing.objects.filter(type_id=2,lesson_id=lessId)
        if get_miss:
            obj = get_miss[0]
            return obj.num_rows * 10
        
    if typeId == 3:
        get_arr = ExerciseArrange.objects.filter(type_id=3,lesson_id=lessId)
        if get_arr:
            obj = get_arr[0]
            return obj.num_rows * 10
    return 0

@register.simple_tag(name="sum_score_exercise")
def sum_score_exercise(userId,courseId,lessonId,typeExe):
    getScore = ScoreStudent.objects.filter(user_id=userId,course_id=courseId,lesson_id=lessonId,type_exercise_id=typeExe)
    sum_score = 0
    if getScore:
        getScore = getScore[0]
        sum_score = getScore.score
    else:
        sum_score = 0
    return sum_score


# tinh toan lien quan lesson
@register.simple_tag(name="total_score_lesson")
def total_score_lesson(lessonId):
    
    list_less = Lesson.objects.filter(pk=lessonId)
    total_score = 0
    if list_less:
        list_less = list_less[0]
        list_exist_type_exe =TypeExercise.objects.all()
        if list_exist_type_exe:
            for item in list_exist_type_exe:
                total_score += sumTotalScoretypeExercise(item.id,list_less.id)
    else:
        total_score = 0
    return total_score

@register.simple_tag(name="sum_score_lesson")
def sum_score_lesson(userId,courseId,lessonId):
    list_less = Lesson.objects.filter(pk=lessonId)
    getScorseuser = ScoreStudent.objects.filter(user_id=userId).filter(course_id=courseId)
    sum_score = 0
    if getScorseuser:
        if list_less:
            lesson = list_less[0]
            getListScore =ScoreStudent.objects.filter(user_id=userId).filter(course_id=courseId)
            if getListScore:
                for item in getListScore:
                    if item.lesson_id == lesson.id:
                        sum_score += item.score
    else:
        sum_score = 0
    return sum_score
# lien quan chapter
@register.simple_tag(name="total_score_chapter")
def total_score_chapter(userId,courseId,chapterId):
    
    list_less_chap = Lesson.objects.filter(chapter_id=chapterId)
    total_score = 0
    if list_less_chap:
        for less in list_less_chap:
            list_exist_type_exe =TypeExercise.objects.all()
            if list_exist_type_exe:
                for item in list_exist_type_exe:
                    total_score += sumTotalScoretypeExercise(item.id,less.id)
    else:
        total_score = 0
    return total_score

@register.simple_tag(name="sum_score_chapter")
def sum_score_chapter(userId,courseId,chapterId):
    list_less_chap = Lesson.objects.filter(chapter_id=chapterId)
    getScorseuser = ScoreStudent.objects.filter(user_id=userId).filter(course_id=courseId)
    sum_score = 0
    if getScorseuser:
        if list_less_chap:
            for less in list_less_chap:
                getListScore =ScoreStudent.objects.filter(user_id=userId).filter(course_id=courseId)
                if getListScore:
                    for item in getListScore:
                        if item.lesson_id == less.id:
                            sum_score += item.score
    else:
        sum_score = 0
    return sum_score

@register.simple_tag(name="sum_score_course")
def sum_score_course(userId,courseId):
    list_less_chap = Chapter.objects.filter(course_id=courseId)
    sum = 0
    if list_less_chap:
        for obj in list_less_chap:
            sum += sum_score_chapter(userId,courseId,obj.id)
    else:
        sum = 0
    return sum

@register.simple_tag(name="total_score_course")
def total_score_course(userId,courseId):
    list_less_chap = Chapter.objects.filter(course_id=courseId)
    total = 0
    if list_less_chap:
        for obj in list_less_chap:
            total += total_score_chapter(userId,courseId,obj.id)
    else:
        total = 0
    return total

@register.simple_tag(name="persent_progress_chap")
def persent_progress_chap(score,total):
    if total == 0 or score == 0:
        return 0
    result = (score*100) / total
    return int(round(result, 0))

@register.simple_tag(name="add_number_1dv")
def add_number_1dv(value):
    return value + 1

@register.simple_tag(name="sub_counter")
def sub_counter(valueCount, valueSub):
    return valueCount - valueSub + 1
