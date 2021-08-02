from rest_framework import serializers
from .models import Modelml

class ModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modelml
        fields = ('id','title','modelml_url', 'model_owner')