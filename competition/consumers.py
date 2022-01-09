import json
from channels.generic.websocket import AsyncWebsocketConsumer, AsyncJsonWebsocketConsumer


class RoomWaitConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'wait_%s' % self.room_name

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

     # Receive message from WebSocket
    async def receive_json(self, content, **kwargs):
        print(content)
        chatMessageRequest = content['chat-message']
        username = content['username']
        message = content['message']

        if chatMessageRequest == "True":
            # Send message to room group
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': message,
                    'username':username,
                    
                }
            )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']
        username = event['username']

        # Send message to WebSocket
        await self.send_json(list([{
            'type_method':'chat_message_wait',
            'message': message,
            'username':username,
        }]))
  

    # Receive remove user  room
    async def remove_member_in_wait_room(self, event):
        message = event['message']
        await self.send_json(message)

    async def send_data_john_room(self, event):
       message = event['message']
       await self.send_json(message)

    async def send_invite_room_to_user(self, event):
       message = event['message']
       await self.send_json(message)

    async def room_wait_to_play_compete(self, event):
       message = event['message']
       await self.send_json(message)

class RoomPlayConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'play_%s' % self.room_name

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive_json(self, content, **kwargs):
        print(content)
        type_send = content['type_send']
        message = content['message']

        if type_send == 'get_new_question':
            # Send to room group
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'get_new_question_compete',
                    'message': list([{
                        'type_send':'get_new_question',
                        
                    }]),
                    
                }
            )
        elif type_send == 'start_play_countdown':
            # Send to room group
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'start_play_countdown',
                    'message': list([{
                        'type_send':'start_play_countdown',
                        
                    }]),
                    
                }
            )

        elif type_send == 'post_answer_incrr_crr':
            correct = content['correct']
            user_id = content['user_id']
            username = content['username']
            date_success = content['date_success']

            # Send to room group
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'post_answer_incrr_crrect',
                    'message': list([{
                        'type_send':'post_answer_incrr_crr',
                        'correct':correct,
                        "user_id":user_id,
                        "username":username,
                        "date_success":date_success,
                    }]),
                    
                }
            )
     # Receive  from room group
    async def post_answer_incrr_crrect(self, event):
        message = event['message']
        await self.send_json(message)

    # Receive  from room group
    async def start_play_countdown(self, event):
        message = event['message']
        await self.send_json(message)

    # Receive  from room group
    async def get_new_question_compete(self, event):
        message = event['message']
        await self.send_json(message)
   

class ListRoomConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'competition_%s' % self.room_name
        print(self.room_group_name)

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )


    async def send_change_or_create_room(self, event):
       message = event['message']
       print(message)
       print('sent')
       await self.send_json(message)




    

