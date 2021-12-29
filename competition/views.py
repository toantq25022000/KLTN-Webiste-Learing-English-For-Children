from django.shortcuts import render
from course.models import Course
from .models import TypeCompetition, RoomCompetition
from .form import FormClassCompetition,FormSkillCompetition
from .handle import get_random_string_digits, check_id_room
from django.http import HttpResponse,JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

import json
from channels.layers import channel_layers, get_channel_layer
from asgiref.sync import async_to_sync
#

from .models import RoomCompetition
# Create your views here.

from usermember.models import MyUser
from django.contrib.sessions.models import Session
from django.utils import timezone

def get_current_users():
    active_sessions = Session.objects.filter(expire_date__gte=timezone.now())
    user_id_list = []
    for session in active_sessions:
        data = session.get_decoded()
        user_id_list.append(data.get('_auth_user_id', None))
    # Query all logged in users based on id list
    return MyUser.objects.filter(id__in=user_id_list)




@login_required(login_url='/login/')
def ListRoomCompetition(request):
    form_class = FormClassCompetition()
    lst_room = RoomCompetition.objects.all()
    context = {
        'form_class':form_class,
        'lst_room':lst_room,
        'room_name':'broadcast'
    }
    return render(request, 'competition/list_room.html',context)



@login_required(login_url='/login/')
def RoomPlayCompetition(request, room_name):
    room_qs = RoomCompetition.objects.filter(id_room = room_name)

    # da co phong ->> ready play
    if room_qs:
        room = room_qs[0]
        list_user_john = room.users.all()

        channel_layers = get_channel_layer()
        # if request.user == host:
        #     item = {
        #         'type_method':'',
        #         'username':request.user.username,
        #     }
        #     data = []
        #     data.append(item)
        #     async_to_sync(channel_layers.group_send)(
        #         "play_"+room_name,
        #         {
        #             'type':'send_data_john_room',
        #             'message': list(data),
        #         })

        context = {
            'room_name': room_name,
            'room':room,
            'list_user_john':list_user_john,
            
        }
        return render(request, 'competition/play_room.html', context)
    else:
        # 
        return render(request, 'pages/empty.html')
        


@login_required(login_url='/login/')
def RoomWaitCompetition(request, room_name):
    room_qs = RoomCompetition.objects.filter(id_room = room_name)

    # da co phong >> join
    if room_qs:
        room = room_qs[0]
        host = room.user_host

        list_user_john = room.users.exclude(id = host.id)
        count_list = list_user_john.count()
        if count_list + 1 == room.type_compete.max_quantity_add_user + 1:
            if not room.users.filter(id = request.user.id):
                if request.user.id != host.id:
                    return render(request, 'pages/empty.html',{'is_enough':True})

        channel_layers = get_channel_layer()
        if request.user == host:
            item = {
                'type_method':'user_add_is_host',
                'username':request.user.username,
            }
            data = []
            data.append(item)
            async_to_sync(channel_layers.group_send)(
                "wait_"+room_name,
                {
                    'type':'send_data_john_room',
                    'message': list(data),
                })
        else:
            exists_user_room = list_user_john.filter(id = request.user.id)
            if exists_user_room:
                item = {
                    'is_exists':True,
                    'type_method':'exists_user_wait_room',
                    'username':request.user.username,
                }
                data = []
                data.append(item)
                async_to_sync(channel_layers.group_send)(
                    "wait_"+room_name,
                    {
                        'type':'send_data_john_room',
                        'message': list(data),
                        
                    })
            else:
                room.users.add(request.user)
                room.save()
                item = {
                    'type_method':'add_user_room',
                    'id_user_john':request.user.id,
                    'avatar':request.user.std_img.url,
                    'username':request.user.username,
                }

                data = []
                data.append(item)
                async_to_sync(channel_layers.group_send)(
                    "wait_"+room_name,
                    {
                        'type':'send_data_john_room',
                        'message': list(data),
                    })
        context = {
            'room_name': room_name,
            'room':room,
             'host':host,
             'list_user_john':list_user_john,
             'host_user':host.username,
        }
        return render(request, 'competition/await_room.html', context)
    else:
        # 
        return render(request, 'pages/empty.html')
        

@login_required(login_url='/login/')
def InitRoomCompetition(request):

    list_type = TypeCompetition.objects.all()
    list_course = Course.objects.all()
    form_class = FormClassCompetition()
    form_skill = FormSkillCompetition()
    context = {
        'list_type': list_type,
        'list_course': list_course,
        'form_class':form_class,
        'form_skill':form_skill,
    }
    return render(request, 'competition/init_room.html', context)

def post_init_room(request):
    if request.method == 'post' or request.method == 'POST':
        type_  = request.POST.get('type')
        class_ques  = request.POST.get('class_ques')
        skills  = request.POST.get('skills')
        private  = request.POST.get('private')

        type_compete = int(type_+'')
        # goi ham get_random_string_digits truyen vao do dai de random ra chuoi gom va ky tu  
        rd_id_room = get_random_string_digits(16)
        # kiem tra neu da ton tai id room thi tao id room khac
        while check_id_room(rd_id_room) == True:
            rd_id_room = get_random_string_digits(16)

        b_private = False
        status_cus = 0
        if private != None:
            status_cus = 1
            b_private = True

        check_exists_user_host = RoomCompetition.objects.filter(user_host = request.user)
        if check_exists_user_host:
            print('da ton tai user host')
            host_user = check_exists_user_host[0]
            host_user.delete()
            print('xoa')
        
        room = RoomCompetition.objects.create(
            id_room= rd_id_room,
            user_host = request.user,
            type_compete_id = type_compete,
            class_compete = class_ques,
            skills = skills,
            is_private = b_private,
            status = status_cus
        )

        data = [
            {
                'id_room': rd_id_room,
                'user_host': request.user.email,
                'type' : type_compete,
                'class_ques' : class_ques,
                'skills' : skills,
                'private' : b_private,
            }
        ]
        return JsonResponse({'status':'Successfull','data':data})
    else:
        return JsonResponse({'status':'Not POST'})

@csrf_exempt
def get_method_post_join_room(request):
    if request.method == 'post' or request.method == 'POST':
        room_id  = request.POST.get('room_id')

        room_qs = RoomCompetition.objects.filter(id_room = room_id)
        if room_qs:
            room = room_qs[0]
            
            status_room = room.status

            if (room.users.all().count() + 1) == (room.type_compete.max_quantity_add_user + 1):
                #da du nguoi tham gia
                return JsonResponse({'status':404})
            #neu la chu phong ma vao phong do
            if request.user == room.user_host:
                print(request.user.email)
                if status_room == 2:  # đang thi
                # dang dien ra
                    return JsonResponse({'status':403})
                #duoc vao phong
                return JsonResponse({'status':202})
            
            if room.is_private == True:
                print('p rieng')
                #private
                return JsonResponse({'status':401})

            #phòng chờ
            if status_room == 0:
                print('cho')
                #wait
                return JsonResponse({'status':202})

            elif status_room == 1: #phòng riêng
                #private
                return JsonResponse({'status':401})
                
            elif status_room == 2:  # đang thi
                print('dang thi')
                 # dang dien ra
                return JsonResponse({'status':403})
            #play
            #return JsonResponse({'status':100})                  
            
        else:
            #khong tim thay id room
            return JsonResponse({'status':503})

@csrf_exempt
def get_method_post_quit_room(request):
    if request.method == 'post' or request.method == 'POST':
        room_id  = request.POST.get('room_id')
        user_quit  = request.user

        room_qs = RoomCompetition.objects.filter(id_room = room_id)
        if room_qs:
            room = room_qs[0]    
            status_room = room.status

            #neu la chu phong ma vao phong do
            if user_quit == room.user_host:
                #huy phong
                return JsonResponse({'status':205})
            else:
                try:
                    room.users.remove(user_quit)
                    room.save()
                    channel_layers = get_channel_layer()
                    item = {
                        'type_method':'quit_user_wait',
                        'id_user_quit':user_quit.id,
                        'username':user_quit.username,
                    }
                    data = []
                    data.append(item)
                    async_to_sync(channel_layers.group_send)(
                        "wait_"+room_id,
                        {
                            'type':'remove_member_in_wait_room',
                            'message': list(data),
                        })
                    #remove duoc user ra khoi phong
                    return JsonResponse({'status':304 })
                except:
                    #khong remove duoc user ra khoi phong
                    return JsonResponse({'status':406})
        else:
            #khong tim thay id room
            return JsonResponse({'status':503})


@csrf_exempt
def post_wait_to_play_compete(request):
    if request.method == 'post' or request.method == 'POST':
        room_id  = request.POST.get('room_id')

        room_qs = RoomCompetition.objects.filter(id_room = room_id)
        if room_qs:
            room = room_qs[0]    
            room.status = 2
            room.save()
            channel_layers = get_channel_layer()
            item = {
                'type_method':'ready_play',
            }
            data = []
            data.append(item)
            async_to_sync(channel_layers.group_send)(
                "wait_"+room_id,
                {
                    'type':'room_wait_to_play_compete',
                    'message': list(data),
                })
            return JsonResponse({'status':103})   
        else:
            #khong tim thay id room
            return JsonResponse({'status':503})
            
@csrf_exempt
def get_post_list_friend_online(request):
    if request.method == 'post' or request.method == 'POST':
        list__ = get_current_users()
        id_request = request.user.id
        print('id re = ',id_request)
        list_fiend_online = list__.exclude(id = id_request).filter(is_staff = 0)
        print('list online = ',list_fiend_online)
        data = []
        for obj in list_fiend_online:
            item = {
                'id_online':obj.id,
                'username_online':obj.username,
            }
            data.append(item)
        return JsonResponse({'status':100, 'data':list(data)})





@csrf_exempt
def get_post_send_invite_to_room(request):
    if request.method == 'post' or request.method == 'POST':
        print(request.POST)
        id_send  = request.POST.get('id')
        id_request = request.POST.get('id_request')
        room_id  = request.POST.get('room_id')
        title  = request.POST.get('title')
        skill  = request.POST.get('skill')
        class_  = request.POST.get('class')

        email_user_qs = MyUser.objects.filter(id = id_request)
        username_user = ''
        if email_user_qs:
            username_user = email_user_qs[0].username
            

        item = {
                'type_method':'invite_friend',
                'username_request_send_invite':username_user,
                'id_request_send_invite':id_request,
                'id_send_invite':id_send,
                'room_id_invite':room_id,
                'title_invite':title,
                'skill_invite':skill,
                'class_invite':class_,
            }
        data = []
        data.append(item)
        try:
            channel_layers = get_channel_layer()
            async_to_sync(channel_layers.group_send)(
                "wait_"+room_id,
                {
                    'type':'send_invite_room_to_user',
                    'message': list(data),
                })
            return JsonResponse({'status':105, 'data':list(data)})
        except:
            return JsonResponse({'status':112, 'data':list(data)})


        

