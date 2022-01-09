from django.shortcuts import render,redirect,get_object_or_404
from django.contrib.auth.decorators import login_required
from course.models import Course
from .models import Order,OrderItem
from course.models import *
from django.utils import timezone 
# Create your views here.

@login_required(login_url='/login/')
def add_to_cart(request,course_id,id_vip):
    item = get_object_or_404(Course, id=course_id)
    
    option_buy_month = int(id_vip)
    vipday = 30
    is__lifetime = False
    total_price = 0
    if option_buy_month == 1:
        vipday = 30
    elif option_buy_month == 2:
        vipday = 90
    elif option_buy_month == 3:
        vipday = 365
    elif option_buy_month == 4:
        is__lifetime = True
        vipday = 18000
    else:
        return redirect('home:index')
    order_item= OrderItem.objects.get_or_create(
        item=item,
        user=request.user,
        purchased=False
        )
    order_qs = Order.objects.filter(user=request.user,ordered=False)

    if order_qs.exists():
        print("da ton tai va chua thanh toan")
        order = order_qs[0]
        if order.items.filter(item__id=item.id).exists():
            order_item[0].vip_days = vipday
            order_item[0].save()
            if option_buy_month == 1:
                total_price =  order_item[0].get_amount_saved_month()
            elif option_buy_month == 2:
                total_price =  order_item[0].get_amount_saved_quarter()
            elif option_buy_month == 3:
                total_price =  order_item[0].get_amount_saved_year()
            elif option_buy_month == 4:
                total_price =  order_item[0].get_amount_saved_lifetime()
            
            order_item[0].total_price = total_price
            order_item[0].is_lifetime = is__lifetime
            order_item[0].save()
            return redirect('payment:checkout')
            #check if the order item is in the order 
        else:
            order_item[0].vip_days = vipday
            order_item[0].save()
            if option_buy_month == 1:
                total_price =  order_item[0].get_amount_saved_month()
            elif option_buy_month == 2:
                total_price =  order_item[0].get_amount_saved_quarter()
            elif option_buy_month == 3:
                total_price =  order_item[0].get_amount_saved_year()
            elif option_buy_month == 4:
                total_price =  order_item[0].get_amount_saved_lifetime()
                
            order_item[0].total_price = total_price
            order_item[0].is_lifetime = is__lifetime
            order_item[0].save()
            order.items.add(order_item[0])
            
            return redirect('payment:checkout')
    else:
        print("tao moi gio hag")
        ordered_date = timezone.now()
        order = Order.objects.create(user=request.user,ordered_date=ordered_date)
        order_item[0].vip_days = vipday
        order_item[0].save()
        if option_buy_month == 1:
            total_price =  order_item[0].get_amount_saved_month()
        elif option_buy_month == 2:
            total_price =  order_item[0].get_amount_saved_quarter()
        elif option_buy_month == 3:
            total_price =  order_item[0].get_amount_saved_year()
        elif option_buy_month == 4:
            total_price =  order_item[0].get_amount_saved_lifetime()
        
        order_item[0].total_price = total_price
        order_item[0].is_lifetime = is__lifetime
        order_item[0].save()
        order.items.add(order_item[0])
        return redirect('payment:checkout')
 
@login_required(login_url='/login/')
def remove_item_from_cart(request,course_id):    
    item = get_object_or_404(Course, id=course_id)
    orders = Order.objects.filter(user=request.user, ordered=False)
    if orders.exists():
        order = orders[0]
        if order.items.filter(item=item).exists():
            order_item = OrderItem.objects.filter(item=item, user=request.user, purchased=False)[0]
            order.items.remove(order_item)
            order_item.delete()
            return redirect('order:cart')
        else:
            return redirect('order:cart')
    else:
        return redirect('order:cart')
    
@login_required(login_url='/login/')
def cart_view(request):
    order_item  = OrderItem.objects.filter(user=request.user,purchased=False)
    order  = Order.objects.filter(user=request.user,ordered=False)
   
    if order_item.exists() and order.exists():
        order = order[0]
        context = {
            'carts':order_item,
            'order':order,
           
        }     
        return render(request,'order/cart.html',context)
    return render(request,'order/cart.html')

def register_course(request,course_id):
    course = get_object_or_404(Course, id=course_id)
    context ={
        'course':course
    }
    return render(request,'order/register_course.html',context)