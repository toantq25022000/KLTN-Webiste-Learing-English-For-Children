
from django.urls import path
from .import views
app_name = 'order'

urlpatterns = [
    path('add-to-cart/<int:course_id>/<int:id_vip>/',views.add_to_cart,name='add-to-cart'),
    path('remove-item-from-cart/<int:course_id>/',views.remove_item_from_cart,name='remove-item-from-cart'),
    path('cart-view/',views.cart_view,name='cart'),
    path('register-course/<int:course_id>/',views.register_course,name='register_course'),
    
]