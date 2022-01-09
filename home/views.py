from django.http.response import JsonResponse
from django.shortcuts import redirect, render
from .forms import registerForm, loginForm
from django.views import View
from django.contrib.auth.models import User
from usermember.models import MyUser
from django.contrib.auth import authenticate, login,logout
from django.http import HttpResponse,HttpResponseRedirect
from course.models import Chapter, Course
from usermember.models import Student,Teacher
from django.contrib.auth.mixins import LoginRequiredMixin

# Create your views here.


def index(request):
    course = Course.objects.all()
    teacher = Teacher.objects.filter(active=True)[:5]
    context = {
        'course':course,
       'teacher':teacher,
    }
    return render(request,'home/index.html',context)

def About(request):
    return render(request, 'home/about.html')

def Contact(request):
    return render(request, 'home/contact.html')

def search_text(request):
    if 'q' in request.GET:
        q = request.GET['q']
        if q == '':
            return redirect('home:index')
        else:
            # co du lieu
              
            data_search = Chapter.objects.filter(title__icontains=q)
            count_search = Chapter.objects.filter(title__icontains=q).count()
            
            return render(request,'home/search.html',{'result':q,'data_search':data_search,'count_search':count_search})
    else:
        return redirect('home:index')

class registerTeacher(LoginRequiredMixin,View):   
    login_url = '/login/'
    def get(self, request):
        return render(request,'home/register_teacher.html')

    def post(self, request):
        print(request.POST)
        fullname = request.POST['fullname_id']
        title = request.POST['title_id']
        phone = request.POST['phone_id']
        email = request.POST['email_id']
        address = request.POST['address_id']
        linkVideo = request.POST['linkVideo_id']
        linkFB = request.POST['linkFB_id']
        experience = request.POST['experience_id']

        check_is_student = Student.objects.filter(user_id=request.user.id)
        check_is_teacher = Teacher.objects.filter(user_id=request.user.id)

        if check_is_student:
            return JsonResponse({'status': 500})

        if check_is_teacher:
            return JsonResponse({'status': 400})
        try:
            teacher = Teacher.objects.create(
                user=request.user,
                fullname=fullname,
                title=title,
                phone=phone,
                email=email,
                address=address,
                link_video=linkVideo,
                link_fb=linkFB,
                experience=experience
            )

            return JsonResponse({'status': 200})
        except:
            return JsonResponse({'status': 300})
    
class registerUser(View):
    def get(self, request):
        return render(request,'home/register.html')

    def post(self, request):
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        repassword = request.POST['repassword']
        uN = ''
        pW = ''
        lenreP = ''
        reP = ''
        if len(username) < 5:
            uN = 'Tên đăng nhập nhỏ hơn 5 ký tự'
        if len(password) < 6:
            pW = 'Mật khẩu nhỏ hơn 6 ký tự'
        if len(repassword) < 6:
            lenreP = 'Mật khẩu nhỏ hơn 6 ký tự'
        if repassword != password:
            reP = 'Nhập lại mật khẩu không trùng khớp'
        context = {'uN':uN,'pW':pW,'lenreP':lenreP,'reP':reP}
        if len(username) >= 5 and len(password) >= 6 and len(repassword) >= 6 and repassword == password:
            user = MyUser(username=username,email=email,password=password)
            user.save()
            suse = 'Đăng ký tài khoản thành công'
            
            return render(request,'home/register.html',{'suse':suse})           
        else:
            return render(request,'home/register.html',context)

class loginUser(View):
    def get(self, request):    
        return render(request,'home/login.html')
    def post(self,request):
        username = request.POST['username'] 
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)  
            return redirect('usermember:dashboard_user',name_url='course')
        else:          
            context = {'mess':'Tên đăng nhập hoặc mật khẩu không đúng','uN':username,'pW':password}
            return render(request,'home/login.html',context)

def logoutUser(request):
    logout(request)

