from django.contrib import admin
from .models import TypeCompetition, RoomCompetition,ScoreCompetition,ManagerUserCompetition
# Register your models here.

admin.site.register(TypeCompetition)

class RoomCompetitionAdmin(admin.ModelAdmin):
    list_display = ['id','id_room','user_host','type_compete','class_compete','is_private','status']
    list_filter = ['status','type_compete','class_compete','is_private','id_room','user_host']
    search_fields = ['type_compete__title','user_host__username','id_room']

    class Meta:
        model = RoomCompetition

admin.site.register(RoomCompetition, RoomCompetitionAdmin)

class ScoreCompetitionAdmin(admin.ModelAdmin):
    list_display = ['id','user','type_compete','result_rank','points_title','timestart']
    search_fields = ['user__username']
    list_filter = ['type_compete','timestart']

admin.site.register(ScoreCompetition, ScoreCompetitionAdmin)

class ManagerUserCompetitionAdmin(admin.ModelAdmin):
    list_display = ['id','user','title','total_battle','win_1v1','win_1v9','total_title']
    search_fields = ['user__username']
    list_filter = ['title']
    
admin.site.register(ManagerUserCompetition, ManagerUserCompetitionAdmin)

