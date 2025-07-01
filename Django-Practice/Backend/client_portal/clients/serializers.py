from rest_framework import serializers
from .models import Client

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client  # which model to use
        fields = '__all__'  # which columns/fields to include in the serializer