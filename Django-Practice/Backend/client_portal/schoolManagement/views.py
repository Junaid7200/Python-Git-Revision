from rest_framework import viewsets
from .models import School, Student, Teacher, Subject
from .serializers import SchoolSerializer, StudentSerializer, TeacherSerializer, SubjectSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

# Create your views here.

class SchoolViewSet(viewsets.ModelViewSet):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer
    
    @action(detail=False, methods=['get'])
    def ids_only(self, request):
        ids = self.queryset.values_list('id', flat=True)
        return Response(ids)

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    
    @action(detail=False, methods=['get'])
    def subject_names(self, request):
        subject_names = self.queryset.values_list('subject_name', flat=True)
        return Response(subject_names)