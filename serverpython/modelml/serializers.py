from rest_framework import serializers
from .models import Modelml

class ModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modelml
        fields = ('id','model_ID','baseline_ID', 'model_owner', 'status')