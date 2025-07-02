from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.



class School(models.Model):
    SCHOOL_TYPES = [
        ('primary', 'Primary'),
        ('intermediate', 'College'),
        ('university', 'University'),
    ]
    school_name = models.CharField(unique=True, max_length=200, help_text="Name of the school")
    address = models.CharField(max_length=300, blank=True, help_text="Address of the school")
    phone = models.CharField(max_length=15, blank=True, help_text="Phone number of the school")
    email = models.EmailField(blank=True, help_text="Email address of the school")
    website = models.URLField(blank=True, help_text="Website of the school")
    school_type = models.CharField(max_length=20, choices=SCHOOL_TYPES, default='primary', help_text="Type of the school")

# metadata
    created_at = models.DateTimeField(auto_now_add=True, help_text="When the school was created")
    updated_at = models.DateTimeField(auto_now=True, help_text="When the school was last updated")

class Student(models.Model):
    student_name = models.CharField(max_length=200, help_text="Name of the student")
    age = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(100)], help_text="Age of the student")
    grade = models.CharField(max_length=50, help_text="Grade or class of the student")
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='students', help_text="School the student is enrolled in")
    # we are referencing the Teacher model before it is defined, so we use a string reference (quotations)
    # the many to many relation goes both ways here, as in multiple students can have multiple teachers
    # and multiple teachers can have multiple students, so we use a ManyToManyField and we also use the related_name
    # to allow us to access the students from the teacher side using teacher.students.all()
    teachers = models.ManyToManyField('Teacher', blank=True, related_name='students', help_text="Teachers assigned to the student")


# metadata
    created_at = models.DateTimeField(auto_now_add=True, help_text="When the student was created")
    updated_at = models.DateTimeField(auto_now=True, help_text="When the student was last updated")

class Teacher(models.Model):
    teacher_name = models.CharField(max_length=200, help_text="Name of the teacher")
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='teachers', help_text="School where the teacher works")
    subjects = models.ManyToManyField('Subject', blank=True, related_name='teachers', help_text="Subjects taught by the teacher")

# metadata
    created_at = models.DateTimeField(auto_now_add=True, help_text="When the teacher was created")
    updated_at = models.DateTimeField(auto_now=True, help_text="When the teacher was last updated")


class Subject(models.Model):
    subject_name = models.CharField(max_length=200, help_text="Name of the subject")
    description = models.TextField(blank=True, help_text="Description of the subject")
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='subjects', help_text="School offering the subject")

# metadata
    created_at = models.DateTimeField(auto_now_add=True, help_text="When the subject was created")
    updated_at = models.DateTimeField(auto_now=True, help_text="When the subject was last updated")