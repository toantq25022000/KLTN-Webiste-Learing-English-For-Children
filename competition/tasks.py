from celery import shared_task
from channels.layers import channel_layers, get_channel_layer
import json
from asgiref.sync import async_to_sync
from celery import Celery, states
from .models import RoomCompetition
from celery.exceptions import Ignore
import asyncio
from .views import run_broadcast_room_competition     

@shared_task(bind = True)
def broadcast_room_competition(self, data):
    print(data)
    try:
        run = run_broadcast_room_competition(data)
        if run == True:
            return "Done"
        else:
            self.update_state(
                state = 'FAILURE',
                meta = {'exe': 'Not Found'}
            )

            raise Ignore()
    except:
        print('loi r')
        self.update_state(
            state = 'FAILURE',
            meta = {'exe': 'Failed'}
        )

        raise Ignore()

