from django import forms

class registerForm(forms.Form):
    username = forms.CharField(max_length=15)
    email = forms.EmailField()
    password = forms.CharField(max_length=20,widget=forms.PasswordInput)

class loginForm(forms.Form):
    username = forms.CharField(max_length=15)
    password = forms.CharField(max_length=20,widget=forms.PasswordInput)