from django import urls
from django.urls import path
from .import views

app_name = 'course'

urlpatterns = [
    path('<int:course_id>/',views.Deatail_Course,name='detailcourse'),  
    path('<int:course_id>/<int:lesson_id>/game/1/<int:num_scores>/<int:is_doing>/<int:is_get>/',views.get_post_data_game_word_card,name='lesson_game_card'),
    path('<int:course_id>/<int:lesson_id>/game/2/<int:num_scores>/<int:is_doing>/<int:is_get>/',views.get_post_data_game_golden_fish,name='lesson_game_golden_fish'),
    path('<int:course_id>/<int:lesson_id>/',views.View_Detail_Lesson,name='detaillesson'),
    path('<int:course_id>/violympic-end-course/<int:vio_one_id>/',views.Violympic_End_Course,name='violympic_end_course'),
    path('<int:course_id>/<int:lesson_id>/exercise/3/<int:num_scores>/<int:is_doing>/<int:is_get>/',views.get_post_data_exercise_arrange,name='lesson_arrange'),
    path('<int:course_id>/<int:lesson_id>/exercise/2/<int:num_scores>/<int:is_doing>/<int:is_get>/',views.get_post_data_exercise_missing,name='lesson_missing'),
    path('<int:course_id>/<int:lesson_id>/exercise/1/<int:num_scores>/<int:is_doing>/<int:is_get>/',views.get_post_data_exercise_choice,name='lesson_choice'),  
]