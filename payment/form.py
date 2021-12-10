from django import forms
from django.forms import fields
from .models import BillingAddress
from order.models import Order
class BillingAddressForm(forms.ModelForm):
    class Meta:
        model = BillingAddress
        fields = ['first_name','last_name','email','phone_number','address']
        
class PaymentMethodForm(forms.ModelForm):
    class Meta:
        model = Order
        fields = ['payment_method',]
        