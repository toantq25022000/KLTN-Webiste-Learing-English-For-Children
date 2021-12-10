from django.shortcuts import render,redirect,get_object_or_404
from django.http import HttpResponse,JsonResponse

from course.models import Course
from order.models import OrderItem,Order,Payment,OrderCashOnDelivery
from usermember.models import TypeScore,ScoreStudent,ScoreViolympicFinishCourse,StudentCourse,MyUser,Student
import json 
from django.core import serializers
from django.views import View
from django.views.generic.base import TemplateView
from django.contrib.auth.decorators import login_required
from datetime import datetime
from django.utils import timezone
from .form import ProfileForm

@login_required(login_url='/login/')
def ViewDashboardUser(request,name_url):
    
    user_ = MyUser.objects.get(pk=request.user.id)
    std_course_qs = Student.objects.filter(user_id = user_.id)
    if std_course_qs:
        std_course = std_course_qs[0]
    if name_url == 'course':
        course_learn_list = StudentCourse.objects.filter(user_id=request.user.id)
        context = {
            'course_learn_list':course_learn_list,
            'nameUrl':name_url,
            'user_':user_,
            'std_course':std_course
        }
        return render(request,'usermember/profile.html',context)
    
    elif name_url == 'profile':
        
        context = {
            'nameUrl':name_url,
            'user_':user_,
            'std_course':std_course
        }
        return render(request,'usermember/profile.html',context)
        
    
    elif name_url == 'order':
        list_ispay = Payment.objects.filter(user_id=request.user.id,payment_text_method='PayPal').order_by('-id')
        list_isCashDelivery = OrderCashOnDelivery.objects.filter(user_id=request.user.id).order_by('-id')
        context = {
            'list_ispay':list_ispay,
            'list_isCashDelivery':list_isCashDelivery,
            'nameUrl':name_url,
            'user_':user_,
            'std_course':std_course
        }      
        return render(request,'usermember/profile.html',context)
    else:
        return redirect('home:index')

def post_data_profile(request):
    user_ = MyUser.objects.get(pk=request.user.id)
    if request.method == 'post' or request.method == 'POST':
        
        # create a form instance and populate it with data from the request:
        # form = ProfileForm(request.POST,instance=user_)
            # check whether it's valid:
        
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        phone_number = request.POST.get('phone_number')
        address = request.POST.get('address')
        sex = request.POST.get('sex')
        birth_date = request.POST.get('birth_date')
        statusImg = request.POST.get('statusImg')
        if 'imageAvatar' in request.FILES:
            avatar=request.FILES['imageAvatar']
        
        birthday = datetime.strptime(birth_date, '%Y-%m-%d').date()
        try:
            user_.first_name = first_name
            user_.last_name = last_name
            user_.email = email
            user_.phone_number = phone_number
            user_.address = address
            user_.sex = sex
            user_.birth_date = birthday
            if 'imageAvatar' in request.FILES:
                if statusImg == 'true':
                    user_.std_img = avatar
            user_.save()
            
            data = [
                {
                    'first_name' : first_name,
                    'last_name' : last_name,
                    'email' : email,
                    'phone_number' : phone_number,
                    'address' : address,
                    'sex' : sex,
                    'birth_date' : birthday,
                }
            ]
            return JsonResponse({'status':'Successfull','data':data})
        except:
            return JsonResponse({'status':'Fail'}) 
        # if a GET (or any other method) we'll create a blank form
    return JsonResponse({'status':'Not POST'}) 

def find_info_student_ui(request):
    return render(request,'usermember/find_info_user_ui.html')

def post_data_find_info_std(request):
    if request.method == 'post' or request.method == 'POST':
        mshv = request.POST['MaHocVien']
        hoten = request.POST['HoTen']
        ngaysinh = request.POST['NgaySinh']
            
            
        if mshv:
            student_qs = Student.objects.filter(id_student = mshv)
            if student_qs:
                student_qs = student_qs[0]
                fullname = student_qs.user.first_name + " " + student_qs.user.last_name
                if hoten:
                    if fullname == hoten:
                        pass
                    else:
                        return JsonResponse({'status':'Not find fullname1'})
                data = []
                item = {
                    'id':student_qs.user.id,
                    'id_std':mshv,
                    'fullname':fullname,
                    'birthday':student_qs.user.birth_date
                }
                data.append(item)
                return JsonResponse({'status':'Successfull','data':data})
            else:
                return JsonResponse({'status':'Not queryset find id student'})
        else:
            if hoten:
                student_qs = Student.objects.all()
                data = []
                check = False
                for std in student_qs:
                    fullname = std.user.first_name + " " + std.user.last_name
                    if fullname == hoten:
                        item = {
                            'id':std.user.id,
                            'id_std':std.id_student,
                            'fullname':fullname,
                            'birthday':std.user.birth_date
                        }
                        data.append(item)
                        check = True
                if check == True:
                    return JsonResponse({'status':'Successfull','data':data})
                else:
                    return JsonResponse({'status':'Not data'})
                    
            else:
                return JsonResponse({'status':'Data not valid'})
            
    else:       
        return JsonResponse({'status':'request not Post'})
    

def view_detailscore_find_student(request,userId):
    user_qs = MyUser.objects.filter(pk=userId)
    if user_qs:
        user_qs = user_qs[0]
        
        std_course = Student.objects.filter(user_id = user_qs.id)
        if std_course: #ton tai user trong danh sach hoc vien
            # lay ra record dau tien
            std_course = std_course[0]
            # get list course of student
            list_course_std = StudentCourse.objects.filter(user_id = user_qs.id)
            
            context ={
                'idUser':userId,
                'std_course':std_course,
                'list_course_std':list_course_std,
            }
            return render(request,'usermember/parents_manage_score_student.html',context)
        else:
            return redirect('usermember:find_info_student')
    else:
        return redirect('usermember:find_info_student')      
        
        


    