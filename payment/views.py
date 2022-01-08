from django.http.response import HttpResponse
from django.shortcuts import render,redirect
from django.http import HttpResponseRedirect,JsonResponse
from django.contrib.auth.decorators import login_required
#model
from payment.models import BillingAddress
from payment.form import BillingAddressForm,PaymentMethodForm
from order.models import Order,OrderItem,OrderCashOnDelivery,Payment
from usermember.models import Student,StudentCourse
from django.conf import settings
import json
from django.urls import reverse
#view 
from django.views.generic import TemplateView
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin
from django.utils import timezone
from datetime import datetime, timedelta

from usermember.createAuto import *
# Create your views here.

def format_us_currency(value):
    value=str(value)
    if value.count(',')==0:
        b,n,v='',1,value
        value=value[:value.rfind('.')]
        for i in value[::-1]:
            b=','+i+b if n==3 else i+b
            n=1 if n==3 else n+1
        b=b[1:] if b[0]==',' else b
        value=b+v[v.rfind('.'):]
    return (value.rstrip('0').rstrip('.') if '.' in value else value)


class CheckoutTemplateView(LoginRequiredMixin, View):
    login_url = '/login/'
    def get(self, request):
        saved_address = BillingAddress.objects.get_or_create(user=request.user)
        saved_address = saved_address[0]
        form = BillingAddressForm(instance=saved_address)
        payment_method = PaymentMethodForm()
        order_qs = Order.objects.filter(user=request.user, ordered=False)
        if not order_qs.exists():
            return redirect('home:index')
        
        order_item = order_qs[0].items.all()
        order_total = order_qs[0].get_totals()
        order_id =order_qs[0].id
        order_total_usd = format_us_currency(round(float(order_total)/22639.85,2))
        if not order_item.exists():
            return redirect('home:index')
        
        pay_meth = request.GET.get('pay_meth')
        context = {
            'billing_address':form,
            'order_item':order_item,
            'order_total':order_total,
            'payment_method':payment_method,
            'paypal_client_id':settings.PAYPAL_CLIENT_ID,
            'pay_meth':pay_meth,
            'order_total_usd':order_total_usd,
            'order_id':order_id,
        }
        
        return render(request,'payment/checkout.html',context)
    def post(self, request):
        
        payment_obj = Order.objects.filter(user=request.user, ordered=False)[0]
        payment_form = PaymentMethodForm(instance=payment_obj)
        
        if request.method == 'post' or request.method == 'POST':
            
            form = BillingAddressForm(request.POST or None)
            pay_form = PaymentMethodForm(request.POST, instance=payment_obj)
            if not form.is_valid():
                return redirect('payment:checkout')
            if form.is_valid() and pay_form.is_valid():
                saved_address = BillingAddress.objects.get_or_create(user=request.user)
                saved_address = saved_address[0]
                form = BillingAddressForm(instance=saved_address)
                form = BillingAddressForm(request.POST, instance=saved_address)
                form.save()
                pay_method = pay_form.save()
                
               
                #Cash on delivery payment proccess
                if pay_method.payment_method == 'Cash on Delivery':
                    
                    billing_address =  BillingAddress.objects.filter(user=request.user)[0]
                    order_qs = Order.objects.filter(user=request.user, ordered=False)
                    order = order_qs[0]
                    order.ordered = True
                    order.billing_address = billing_address
                    order.save()
                    order_items = OrderItem.objects.filter(user=request.user, purchased=False)
                    for item in order_items:
                        item.purchased = True
                        item.save()
                   
                    order_cash_delivery = OrderCashOnDelivery.objects.create(
                        user=request.user,
                        order=order,
                        amount=order.get_totals()
                    )
                    order_cash_delivery.save()
                    return redirect('payment:success_payment',id_order=order.id)
                #paypal
                if pay_method.payment_method == 'PayPal':
                    
                    return redirect(reverse('payment:checkout') + "?pay_meth=" + pay_method.payment_method)  
            return redirect('payment:checkout')
        

def success_payment(request,id_order): 
    order_qs = Order.objects.filter(id=id_order)   
    if not order_qs.exists():
        return redirect('home:index')
    
    order_item = order_qs[0].items.all() 
    order_total = order_qs[0].get_totals()
    method_pay = order_qs[0].get_payment_method_display

    context = {
        "Ma_GD":"DH"+"{0:0>7}".format(id_order),
        'order_item':order_item,
        'order_total':order_total,
        'method_pay':method_pay,
    }
    return render(request,'payment/success_payment.html',context)

class paypalPaymentMethod(View):
    def post(self,request):
        data = json.loads(request.body)
        order_id = data['order_id']    
        payment_id = data['payment_id']             
        status = data['status']       
                   
        if status ==  'COMPLETED':
            if request.user.is_authenticated:
                billing_address =  BillingAddress.objects.filter(user=request.user)[0]
                order_qs = Order.objects.filter(user=request.user, ordered=False)
                order = order_qs[0]
                order.ordered = True
                order.billing_address = billing_address
                order.save()
                payment = Payment.objects.create(
                    paymentId=payment_id,
                    orderId=order_id,
                    user=request.user,
                    order=order,
                    amount=order.get_totals(),
                    payment_text_method='PayPal'
                )
                payment.save()
                order_items = OrderItem.objects.filter(user=request.user, purchased=False)
                for obj in order_items:   
                    std_qs = Student.objects.filter(user=request.user)
                    if std_qs.exists():
                        pass
                            
                    else:
                        #add student if user is not exist in models Student
                        create_std = Student.objects.create(user=request.user)
                        
                        #add id student auto
                        create_std.id_student = create_auto_id_std(create_std.user.id)
                        create_std.save()
                        # 
                    
                    std_course_qs = StudentCourse.objects.filter(user=request.user,course=obj.item.id)
                    #da ton tai khoa hoc nay
                    if std_course_qs.exists():
                        #udpate and addition days , finish date
                        std_course = std_course_qs[0]
                        day_vip = obj.vip_days
                        finish_date = std_course.finish_date + timedelta(days=day_vip)
                        if std_course.lifetime == True:
                            pass
                        else:
                            std_course.finish_date = finish_date
                            std_course.lifetime = False
                            std_course.save()
                    else:
                        #create new student course
                        start_date = datetime.now()
                        day_vip = obj.vip_days
                        finish_date = start_date + timedelta(days=day_vip)
                        
                        create_std_cs = StudentCourse.objects.create(
                            user=request.user,
                            course=obj.item,
                            start_date=start_date,
                            finish_date=finish_date,
                            lifetime=obj.is_lifetime
                        )
                    # save purchased is true 
                    obj.purchased = True
                    obj.save()  
                return JsonResponse("Payment completed!", safe=False)
            else:
                return JsonResponse("Payment Error!", safe=False)
        else:      
            return JsonResponse("Payment Error!", safe=False)

