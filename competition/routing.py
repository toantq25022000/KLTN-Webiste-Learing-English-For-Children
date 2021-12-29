from django.urls import path,re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/wait/(?P<room_name>\w+)/$', consumers.RoomWaitConsumer.as_asgi()),
    re_path(r'ws/play/(?P<room_name>\w+)/$', consumers.RoomPlayConsumer.as_asgi()),
    re_path(r'ws/competition/(?P<room_name>\w+)/$', consumers.ListRoomConsumer.as_asgi()),
]


