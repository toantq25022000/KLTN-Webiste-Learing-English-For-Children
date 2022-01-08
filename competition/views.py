from django.shortcuts import render
from course.models import Course
from .models import TypeCompetition, RoomCompetition,ScoreCompetition,ManagerUserCompetition
from .form import FormClassCompetition,FormSkillCompetition
from .handle import get_random_string_digits, check_id_room
from django.http import HttpResponse,JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

import json
from channels.layers import channel_layers, get_channel_layer
from asgiref.sync import async_to_sync
#
import calendar
from datetime import datetime
from django.utils import timezone
from .models import RoomCompetition
# Create your views here.
import threading
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

        check_exists_user_host = RoomCompetition.objects.filter(user_host = request.user)
        
        if check_exists_user_host:
            data = [
                {
                    'id_room': check_exists_user_host[0].id_room,
                }
            ]
            return JsonResponse({'status':1062,'data':data})

            # host_user = check_exists_user_host[0]
            # host_user.delete()
        
        room = RoomCompetition.objects.create(
            id_room= rd_id_room,
            user_host = request.user,
            type_compete_id = type_compete,
            class_compete = class_ques,
            skills = skills,
            is_private = b_private,
            status = status_cus
        )
        return JsonResponse({'status':201,'data':data})
       
    else:
        return JsonResponse({'status':403})


def rankUserInWeek(userId):
    dt_today = datetime.today()
    day_today = dt_today.day
    month_today = dt_today.month
    year_today = dt_today.year
    max_day_month = calendar.monthrange(year_today, month_today)[1]
    day_start = 1
    day_end = 1

    if day_today <= 7:
        day_start = 1
        day_end = 7
    elif day_today <= 14:
        day_start = 8
        day_end = 14
    elif day_today <= 21:  
        day_start = 15
        day_end = 21
    else:
        day_start = 22
        day_end = max_day_month

    datetimeStart = datetime(year_today,month_today,day_start)
    datetimeEnd = datetime(year_today,month_today,day_end)

    list_rank_qs = ScoreCompetition.objects.filter(timestart__range = (datetimeStart,datetimeEnd))
    data_rank = []

    resultFind = None
    for obj in list_rank_qs:
        resultFind = next((x for x in data_rank if x["id"] == obj.user.id), None)
        
        if resultFind is None:
            item = {
                "id":obj.user.id,
                "username":obj.user.username,
                "point":obj.points_title,
            }
            data_rank.append(item)
        else:
            resultFind["point"] += obj.points_title
    data_rank.sort(key=lambda x: x["point"], reverse=True)
   
    index = next((i for i, item in enumerate(data_rank) if item["id"] == userId), -1)
    if index == -1:
        return "Vô hạng"
    return index + 1 # index array start: 0

def rankListMember(type_,num_week):
    num_week = int(num_week)
    dt_today = datetime.today()
    day_today = dt_today.day
    month_today = dt_today.month
    year_today = dt_today.year
    max_day_month = calendar.monthrange(year_today, month_today)[1]
    day_start = 1
    day_end = 1
    if num_week == 1:
        day_start = 1
        day_end = 7
    elif num_week == 2:
        day_start = 8
        day_end = 14
    elif num_week == 3:  
        day_start = 15
        day_end = 21
    else:
        day_start = 22
        day_end = max_day_month
    datetimeStart = datetime(year_today,month_today,day_start)
    datetimeEnd = datetime(year_today,month_today,day_end)
    list_rank_qs = None
    if type_ == "ALL":
        list_rank_qs = ScoreCompetition.objects.filter(timestart__range = (datetimeStart,datetimeEnd))
    
    elif type_ == "1":
        list_rank_qs = ScoreCompetition.objects.filter(timestart__range = (datetimeStart,datetimeEnd),type_compete_id = 1)
    else:
        list_rank_qs = ScoreCompetition.objects.filter(timestart__range = (datetimeStart,datetimeEnd),type_compete_id = 2)
    data_rank = []
    resultFind = None
    rank_int = 0
    for obj in list_rank_qs:

        resultFind = next((x for x in data_rank if x["id"] == obj.user.id), None)
        manageuser = ManagerUserCompetition.objects.filter(user=obj.user)[0]
        if resultFind is None:
            item = {
                "id":obj.user.id,
                "username":obj.user.username,
                "img":obj.user.std_img.url,
                "title":manageuser.title,
                "total_win":0,
                "total_battle_rank":0,
                "star_title":manageuser.star_title,
                "point":obj.points_title,
            }
            data_rank.append(item)
        else:
            rank_int = int(obj.result_rank[len(obj.result_rank)-1:len(obj.result_rank)])
           
            if rank_int <= 3:
                resultFind["total_win"] += 1
                resultFind["point"] += obj.points_title
            
            resultFind["total_battle_rank"] += 1
    data_rank.sort(key=lambda x: x["point"], reverse=True)
    return data_rank

def GetRankByWeek(request):
    if request.method == 'GET' or request.method == 'get':
        type = request.GET['type']
        week_post = request.GET['week']
   
       
        if type == "ALL":
            rank_All =  rankListMember("ALL",week_post)
            rankIndexUserAll = next((item for  item in rank_All if item["id"] == request.user.id), -1)
            rankIndex = next((i for i, item in enumerate(rank_All) if item["id"] == request.user.id), -1)
            return JsonResponse({"type":"ALL","rankingAllAtTime":list(rank_All),"rankIndex":rankIndex,"rankIndexUserAll":rankIndexUserAll,})
        elif type == "1": 
            rank_1v1 =  rankListMember("1",week_post)
            rankIndexUserType1 = next((item for  item in rank_1v1 if item["id"] == request.user.id), -1)
            rankIndex = next((i for i, item in enumerate(rank_1v1) if item["id"] == request.user.id), -1)
            return JsonResponse({"type":"1v1", "rankingType1AtTime":list(rank_1v1),"rankIndex":rankIndex, "rankIndexUserType1":rankIndexUserType1,})
        else:
            rank_1v9 =  rankListMember("9",week_post)
            rankIndexUserType9 = next((item for item in rank_1v9 if item["id"] == request.user.id), -1)
            rankIndex = next((i for i, item in enumerate(rank_1v9) if item["id"] == request.user.id), -1)
            return JsonResponse({"type":"1v9","rankingType9AtTime":list(rank_1v9),"rankIndex":rankIndex, "rankIndexUserType9":rankIndexUserType9,})
      
def HistoryMemberCompete(request):
    kqRank = rankUserInWeek(request.user.id)
    
    dt_today = datetime.today()
    day_today = dt_today.day
    month_today = dt_today.month
    year_today = dt_today.year
    max_day_month = calendar.monthrange(year_today, month_today)[1]

    day_start = 1
    day_end = 1
    win1v1 = 0
    win1v9 = 0
    total_1v1 = 0
    total_1v9 = 0

    if day_today <= 7:
        day_start = 1
        day_end = 7
    elif day_today <= 14:
        day_start = 8
        day_end = 14
    elif day_today <= 21:  
        day_start = 15
        day_end = 21
    else:
        day_start = 22
        day_end = max_day_month

    datetimeStart = datetime(year_today,month_today,day_start)
    datetimeEnd = datetime(year_today,month_today,day_end)

    list_history_qs = ScoreCompetition.objects.filter(user=request.user,timestart__range = (datetimeStart,datetimeEnd)).order_by('-id')[:20]
    manager_user_history = ManagerUserCompetition.objects.filter(user=request.user)
    
    total_win = 0
    title_user = ''
    total_points_title = 0

    if manager_user_history:
        manager_user_history = manager_user_history[0]
        total_win = manager_user_history.win_1v1 + manager_user_history.win_1v9
        title_user = manager_user_history.title
        total_points_title = manager_user_history.total_title

    
    rank_int = 0
    for item in list_history_qs:
        

        rank_int = int(item.result_rank[len(item.result_rank)-1:len(item.result_rank)])
        if item.type_compete.max_quantity_add_user == 1:
            total_1v1 += 1
        else:
            total_1v9 += 1
        if rank_int <= 3:
            if item.type_compete.max_quantity_add_user == 1:
                win1v1 += 1
            else:
                win1v9 += 1
    
    context = {
        'list_history':list_history_qs,
        'total_points_title':total_points_title,
        'win1v1':win1v1,
        'win1v9':win1v9,
        'total_1v1':total_1v1,
        'total_1v9':total_1v9,
        'total_win':total_win,
        'title_user':title_user,
        'kqRank':kqRank,
    }
    return render(request, 'competition/history_member_compete.html',context)

def RankingCompetition(request):
    dt_today = datetime.today()
    day_today = dt_today.day
    month_today = dt_today.month
    year_today = dt_today.year
 
    week_of_month = 1
    if day_today <= 7:
        week_of_month = 1
    elif day_today <= 14:
        week_of_month = 2
    elif day_today <= 21:  
        week_of_month = 3
    else:
        week_of_month = 4
    return render(request,'competition/ranking.html',{'week_of_month':range(week_of_month),"month_today":month_today,"num_week_month_today":week_of_month})

@csrf_exempt
def Post_Result_Play(request,room_name):
    if request.method == 'post' or request.method == 'POST':
        data = request.POST['json_data']; 
        list = json.loads(data)
        print(list)
        room_qs = RoomCompetition.objects.filter(id_room = room_name)
        if room_qs:
            room_qs = room_qs[0]
        current_tz = timezone.get_current_timezone()
        for item in list:
            userPost = item['username']
            scoreDHWin = item['scoreDHWin']
            rankResult = item['rankResult']
            timeStart = item['timeStart']

            c_time_start = datetime.strptime(timeStart, "%Y-%m-%d %H:%M:%S")
            tz_time_start = current_tz.localize(c_time_start)

            user_qs = MyUser.objects.filter(username = userPost)[0]
            managerUser = ManagerUserCompetition.objects.filter(user=user_qs)
            manager_user = None
            if managerUser:
                manager_user = managerUser[0]
            else:
                manager_user = ManagerUserCompetition.objects.create(user=user_qs)

            score_compete = ScoreCompetition.objects.create(
                user=user_qs,
                type_compete = room_qs.type_compete,
                result_rank = "Xếp hạng " + str(rankResult),
                points_title = scoreDHWin,
                timestart = tz_time_start,
            )
           
            if manager_user.title == '':
                manager_user.title = "Newbie"

            manager_user.total_battle = manager_user.total_battle + 1

            if rankResult <= 3:
                if room_qs.type_compete.max_quantity_add_user == 1:
                    manager_user.win_1v1 = manager_user.win_1v1 + 1
                else:
                    manager_user.win_1v9 = manager_user.win_1v9 + 1
            # ++ score title
            manager_user.total_title = manager_user.total_title + scoreDHWin

            manager_user.save()

        return JsonResponse({'status':'Successfull'})

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


        

