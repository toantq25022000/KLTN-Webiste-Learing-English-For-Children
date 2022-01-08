from django.urls import path
from .views import *

app_name = 'payment'

urlpatterns = [
    path('checkout/',CheckoutTemplateView.as_view(),name='checkout'),
    path('paypal/',paypalPaymentMethod.as_view(),name='paypal_payment'),
    path('success-payment-<int:id_order>/',success_payment,name='success_payment'),
    
]
