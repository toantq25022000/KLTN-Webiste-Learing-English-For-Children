from django.urls import path
from .views import *

app_name = 'usermember'

urlpatterns = [
    path('user/<str:name_url>/',ViewDashboardUser,name='dashboard_user'),
    path('parents/find-info-student/',find_info_student_ui,name='find_info_student'),
    path('parents/post-data-find-info-student/',post_data_find_info_std,name='post_data_find_info_std'),
    path('user/profile/post-data-profile/',post_data_profile,name='post_data_profile'),
    path('parents/view-manage-score-student/<int:userId>/',view_detailscore_find_student,name='view_detailscore_find_student'),   
]
