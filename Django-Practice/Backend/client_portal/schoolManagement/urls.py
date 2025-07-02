from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SchoolViewSet, StudentViewSet, TeacherViewSet, SubjectViewSet

router = DefaultRouter()
router.register(r'schools', SchoolViewSet)
router.register(r'students', StudentViewSet)
router.register(r'teachers', TeacherViewSet)
router.register(r'subjects', SubjectViewSet)

urlpatterns = [
    path('management/', include(router.urls)),
]