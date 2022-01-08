from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(OrderItem)
@admin.register(Order)
class OrderModelAdmin(admin.ModelAdmin):
    list_display=['user','start_date','ordered']
    search_fields = ['user__username']
    

@admin.register(OrderCashOnDelivery)
class OrderCashOnDeliveryModelAdmin(admin.ModelAdmin):
    list_display=['user','amount','status','time_order']
    search_fields = ['user__username']

@admin.register(Payment)
class PaymentModelAdmin(admin.ModelAdmin):
    list_display=['user','paymentId','orderId','amount','payment_text_method','timestamp']
    search_fields = ['user__username']

