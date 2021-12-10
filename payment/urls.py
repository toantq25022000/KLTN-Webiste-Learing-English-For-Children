from django.urls import path
from .views import *

app_name = 'payment'

urlpatterns = [
    path('checkout/',CheckoutTemplateView.as_view(),name='checkout'),
    path('paypal/',paypalPaymentMethod.as_view(),name='paypal_payment'),
    path('success-order-cash-on-delivery/',success_order_cash_on_delivery,name='success_order_cash_on_delivery'),
    path('success-payment/',success_payment,name='success_payment'),
    
]
