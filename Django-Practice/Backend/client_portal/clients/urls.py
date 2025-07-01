from django.urls import path
from . import views

urlpatterns = [
    path('clients/', views.ClientListCreate.as_view(), name='client-list-create'),
]