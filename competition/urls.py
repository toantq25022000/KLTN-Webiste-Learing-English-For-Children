from django.urls import path,re_path
from . import views

app_name = 'competition'

urlpatterns = [
    path('', views.ListRoomCompetition,name='list_room_competition'),
    path('init-room/', views.InitRoomCompetition,name='init_room_competition'),
    path('wait-<str:room_name>/', views.RoomWaitCompetition,name='await_room_competition'),
    path('play-<str:room_name>/', views.RoomPlayCompetition,name='room_play_competition'),

    path('post-init-room/', views.post_init_room,name='post_init_room'),
    path('get_method_post_join_room/', views.get_method_post_join_room,name='get_method_post_join_room'),
    path('get_method_post_quit_room/', views.get_method_post_quit_room,name='get_method_post_quit_room'),
    path('thidau/getMembersIdOnline/', views.get_post_list_friend_online,name='get_post_list_friend_online'),
    path('get_post_send_invite_to_room/', views.get_post_send_invite_to_room,name='get_post_send_invite_to_room'),
    path('post_wait_to_play_compete/', views.post_wait_to_play_compete,name='post_wait_to_play_compete'), 
]


