from django.db import models
# from django.contrib.auth.models import User
from usermember.models import MyUser
# Create your models here.

class BillingAddress(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    email = models.EmailField(max_length=30)
    phone_number = models.CharField(max_length=16)
    address = models.TextField(max_length=200)
    
    
    
    def __str__(self):
        return f"{self.user.username}'s billing address"
    
    def is_fully_filled(self):
        field_names = [f.name for f in self._meta.get_fields()]
        for field_name in field_names:
            value = getattr(self, field_name)
            if value is None or value == '':
                return False
        return True

