from django import forms
from .models import RoomCompetition

class FormClassCompetition(forms.ModelForm):
    class Meta:
        model = RoomCompetition
        fields =  ['class_compete',]

class FormSkillCompetition(forms.ModelForm):
    class Meta:
        model = RoomCompetition
        fields =  ['skills',]