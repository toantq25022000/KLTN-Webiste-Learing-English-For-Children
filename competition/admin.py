from django.contrib import admin
from .models import TypeCompetition, RoomCompetition
# Register your models here.

admin.site.register(TypeCompetition)

class RoomCompetitionAdmin(admin.ModelAdmin):
    list_display = ['id','id_room','user_host','type_compete','class_compete','is_private','status']
    list_filter = ['status','type_compete','class_compete','is_private','id_room','user_host']
    search_fields = ['type_compete__title','user_host__username','id_room']

    class Meta:
        model = RoomCompetition

admin.site.register(RoomCompetition, RoomCompetitionAdmin)

