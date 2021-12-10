from django import forms
from django.forms import fields
from usermember.models import MyUser
class ProfileForm(forms.ModelForm):
    class Meta:
        model = MyUser
        fields = ['first_name','last_name','email','phone_number','address','sex','birth_date']
    
    