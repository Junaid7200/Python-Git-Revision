from rest_framework import generics

from .serializers import ClientSerializer
from .models import Client

# Create your views here.


class ClientListCreate(generics.ListCreateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer