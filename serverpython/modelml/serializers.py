from rest_framework import serializers
from .models import Modelml

class ModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modelml
        fields = '__all__'