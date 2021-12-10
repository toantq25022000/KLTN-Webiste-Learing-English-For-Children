from django import template
from order.models import (
    Order,OrderItem
)
from decimal import *
from datetime import datetime,date
 
register = template.Library()

@register.filter
def cart_view(user):
    order_item = OrderItem.objects.filter(user=user,purchased=False)
    if order_item.exists():
        return order_item
    else:
        return None

@register.filter
def cart_total(user):
    order = Order.objects.filter(user=user,ordered=False)
    if order.exists():
        return order[0].get_totals()
    else:
        return 0
@register.filter
def cart_count(user):
    order = Order.objects.filter(user=user,ordered=False)
    if order.exists():
        return order[0].items.count()
    else:
        return 0

@register.simple_tag
def list_order_item(orderId):
    print(orderId)
    order = Order.objects.filter(id=orderId)
    if order.exists():
        order = order[0]
        return order.items.all()
    else:
        return None

@register.simple_tag(name="day_left")
def day_left(finish_date):
    # date_finish =  datetime.strptime(finish_date, "%y-%m-%d")
    date_now = datetime.now().strftime(("%y-%m-%d"))
    date_now_format = datetime.strptime(date_now, '%y-%m-%d').date()
    delta =finish_date - date_now_format
    days = delta.days
    
    return days
    