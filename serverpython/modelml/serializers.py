from rest_framework import serializers
from .models import Modelml
from django.contrib.auth import authenticate

class ModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modelml
        fields = ('title','modelml_url', 'model_owner')