from rest_framework import serializers
from .models import School, Student, Teacher, Subject
class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')
    def validate_school_name(self, value):
        if not value:
            raise serializers.ValidationError("School name cannot be empty.")
        return value
    def validate_phone(self, value):
        if value and not value.isdigit():
            raise serializers.ValidationError("Phone number must contain only digits.")
        return value
    def validate_email(self, value):
        if value and '@' not in value:
            raise serializers.ValidationError("Invalid email address.")
        return value
    def validate_website(self, value):
        if value and not value.startswith(('http://', 'https://')):
            raise serializers.ValidationError("Website must start with 'http://' or 'https://'.")
        return value

class StudentSerializer(serializers.ModelSerializer):
    school = SchoolSerializer(read_only=True) # Nested serializer to include school details, read-only
    class Meta:
        model = Student
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')
    def validate(self, attrs):
        student_name = attrs.get('student_name')
        age = attrs.get('age')
        school = attrs.get('school')
        school_type = school.school_type if school else None
        grade = attrs.get('grade')
        if not student_name:
            raise serializers.ValidationError("Student name cannot be empty.")
        if age and (age < 1 or age > 100):
            raise serializers.ValidationError("Age must be between 1 and 100.")
        if not school:
            raise serializers.ValidationError("School must be provided.")
        if school_type == 'primary':
            possible_primary_grades = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
            if grade not in possible_primary_grades:
                raise serializers.ValidationError(f"Grade must be one of {possible_primary_grades} for primary schools.")
        elif school_type == 'intermediate':
            possible_intermediate_grades = ['11', '12']
            if grade not in possible_intermediate_grades:
                raise serializers.ValidationError(f"Grade must be one of {possible_intermediate_grades} for intermediate schools.")
        elif school_type == 'university':
            possible_university_grades = ['bachelors', 'masters', 'phd']
            if grade not in possible_university_grades:
                raise serializers.ValidationError(f"Grade must be one of {possible_university_grades} for universities.")
        return attrs


class TeacherSerializer(serializers.ModelSerializer):
    school = SchoolSerializer(read_only=True) # Nested serializer to include school details, read-only
    students = StudentSerializer(many=True, read_only=True) # Nested serializer to include students, read-only
    class Meta:
        model = Teacher
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')
    
    def validate_teacher_name(self, value):
        if not value:
            raise serializers.ValidationError("Teacher name cannot be empty.")
        return value


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')

    def validate_subject_name(self, value):
        if not value:
            raise serializers.ValidationError("Subject name cannot be empty.")
        return value
