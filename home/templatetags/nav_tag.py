from django import template
from course.models import Course,Chapter
from decimal import *
from datetime import datetime
register = template.Library()

@register.simple_tag
def nav_course():
    return Course.objects.all()

@register.simple_tag
def course_lesson(value):
    return Course.objects.get(pk=value)



@register.simple_tag(name="get_id_course")
def get_id_course(id_chap):
    chap_course = Chapter.objects.get(pk=id_chap)
    if chap_course:
        course_id = chap_course.course_id
        return Course.objects.get(pk=course_id)
    return ''


