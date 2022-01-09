from django.db import models
# from django.contrib.auth.models import User
from usermember.models import MyUser
from course.models import Course
from usermember.models import Student,StudentCourse
from django.core.validators import  MaxValueValidator, MinValueValidator 
from payment.models import BillingAddress
from datetime import datetime, timedelta
from usermember.createAuto import *
# Create your models here.


class OrderItem(models.Model):
    user = models.ForeignKey(MyUser,on_delete=models.CASCADE)
    purchased = models.BooleanField(default=False)
    item = models.ForeignKey(Course,on_delete=models.CASCADE)
    total_price = models.DecimalField(default=0,max_digits=8, decimal_places=0)
    vip_days = models.PositiveSmallIntegerField(default=0)
    is_lifetime = models.BooleanField(default=False) 
    

    def __str__(self):
        return f"{self.item.title} of {self.user.username} -- VIP: {self.vip_days} days"
    def get_total_item_price_month(self):
        return self.item.price_month
    
    def get_total_item_price_quarter(self):
        return self.item.price_quarter
    
    def get_total_item_price_year(self):
        return self.item.price_year
    
    def get_total_item_price_lifetime(self):
        return self.item.price_lifetime
    
    def get_total_discount_item_price_month(self):
        return (self.item.price_month*self.item.discounted_price)/100 
    
    def get_total_discount_item_price_quarter(self):
        return (self.item.price_quarter*self.item.discounted_price)/100 

    def get_total_discount_item_price_year(self):
        return (self.item.price_year*self.item.discounted_price)/100
     
    def get_total_discount_item_price_lifetime(self):
        return (self.item.price_lifetime*self.item.discounted_price)/100 

    def get_amount_saved_month(self):
        return self.get_total_item_price_month() - self.get_total_discount_item_price_month()
    
    def get_amount_saved_quarter(self):
        return self.get_total_item_price_quarter() - self.get_total_discount_item_price_quarter()
    
    def get_amount_saved_year(self):
        return self.get_total_item_price_year() - self.get_total_discount_item_price_year()
    
    def get_amount_saved_lifetime(self):
        return self.get_total_item_price_lifetime() - self.get_total_discount_item_price_lifetime()
    
class Order(models.Model):  
    PAYMENT_MOTHOD = (
        ('Cash on Delivery','Thanh toán khi nhận hàng'),
        ('PayPal','PayPal')
    )
    user = models.ForeignKey(MyUser,on_delete=models.CASCADE)
    items = models.ManyToManyField(OrderItem)
    start_date = models.DateTimeField(auto_now_add=True)
    ordered_date = models.DateTimeField()
    ordered = models.BooleanField(default=False) 
    payment_method = models.CharField(max_length=30,choices=PAYMENT_MOTHOD,default='Cash on Delivery')
    billing_address = models.ForeignKey(BillingAddress,on_delete=models.SET_NULL,null=True,blank=True)
    
    def __str__(self):
        return self.user.username
    
    def get_totals(self):
        total = 0
        for order_item in self.items.all():
             total += order_item.total_price
        return total

class OrderCashOnDelivery(models.Model):
    STATUS_CHOICE = (
        ('A','Chưa duyệt đơn hàng'),
        ('B','Đã duyệt đơn hàng'),
        ('C','Nhân viên đang đến'),
        ('D','Đã thanh toán tiền'),
    )
    
    user = models.ForeignKey(MyUser,on_delete=models.CASCADE)
    order = models.ForeignKey(Order,on_delete=models.CASCADE)
    amount = models.DecimalField(default=0,max_digits=8, decimal_places=0)
    status = models.CharField(max_length=30,choices=STATUS_CHOICE,default='A')
    time_order = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.user.username
    
    def get_value_status(self):
        return self.status
    
    def save(self, *args, **kwargs):
       if self.get_value_status() == 'D':
            pay_ = Payment.objects.filter(orderId=self.order.pk)
            if pay_.exists():
               return
            else:
                payment = Payment.objects.get_or_create(
                    paymentId = self.order.payment_method,
                    orderId = self.order.pk,
                    user = self.user,
                    order= self.order,
                    amount = self.amount,
                    payment_text_method = 'Thanh toán khi nhận hàng'
                ) 
                order_item = self.order.items.all()
                if order_item.exists():
                    for obj in order_item:
                        std_qs = Student.objects.filter(user=self.user)
                        if std_qs.exists():
                            pass
                                
                        else:
                            #add student if user is not exist in models Student
                            create_std = Student.objects.create(user=self.user)
                            #add id student auto
                            create_std.id_student = create_auto_id_std(create_std.user.id)
                            create_std.save()
                        
                        std_course_qs = StudentCourse.objects.filter(user=self.user,course=obj.item.id)
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
                                user=self.user,
                                course=obj.item,
                                start_date=start_date,
                                finish_date=finish_date,
                                lifetime=obj.is_lifetime
                            )
       super(OrderCashOnDelivery, self).save(*args, **kwargs)
class Payment(models.Model):   
    paymentId = models.CharField(max_length=255,blank=True,null=True)
    orderId = models.CharField(max_length=255,blank=True,null=True)
    user = models.ForeignKey(MyUser,on_delete=models.CASCADE)
    order = models.ForeignKey(Order,on_delete=models.CASCADE)
    amount = models.DecimalField(default=0,max_digits=8, decimal_places=0)
    payment_text_method = models.CharField(max_length=50,blank=True,null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.user.username