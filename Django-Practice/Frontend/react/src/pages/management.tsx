import { useParams } from "react-router-dom";
import ManagementForm from '../components/managementForm';
import { useState, useEffect } from 'react';

interface FormField {
  name: string;
  label: string;
  type: string;
  value: string;
  options?: string[];
  placeholder?: string;
  required?: boolean;
}




export default function ManagementPage() {
    const { entity } = useParams();
    const [school_ids, setSchoolIds] = useState([]);
    const [subject_names, setSubjectNames] = useState([]);
    const get_school_ids = () => {
        fetch('http://localhost:8000/api/management/schools/ids_only/')
        .then (response => response.json())
        .then (data => {
            setSchoolIds(data);
        })
        .catch(error => {
            console.error(error);
            console.log('this is the catch block from the ids_only api request');
        })
    };

    useEffect (() => {
        get_school_ids();
        get_subject_names();
    }, []);

    


    const get_subject_names = () => {
        fetch('http://localhost:8000/api/management/subjects/subject_names/')
        .then(response => response.json())
        .then(data => {
            setSubjectNames(data);
        })
        .catch(error => {
            console.error(error);
            console.log('this is the catch block from the subject_names api request');
        })
    }
    const insertSchool = (formData: Record<string, any>) => {
        console.log("Making POST request for schools started")
        fetch('http://localhost:8000/api/management/schools/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData),
        })
        .then(async (response) => {
            if (!response.ok) {
                const errorText = await response.text();
                console.error('There was a problem making the POST request to schools:', errorText);
                console.log(`Response status: ${response.status}`);
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.error('Error: catch block initiated for schools: ', error);
        })
    };

    const insertSubject = (formData: Record<string, any>) => {
        console.log("Making POST request for subjects started")
        fetch('http://localhost:8000/api/management/subjects/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData),
        })
        .then(async (response) => {
            if (!response.ok) {
                const errorText = await response.text();
                console.log(`errorText: ${errorText}`);
                console.log(`Response status: ${response.status}`);
                throw new Error('Network response was not ok');
            }
            console.log("making POST request for subjects")
            return response.json();
        })
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.error('Error: catch block initiated for subjects: ', error);
        })
    };

    const insertTeacher = (formData: Record<string, any>) => {
        fetch('http://localhost:8000/api/management/teachers/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })
        .then( async response => {
            if(!response.ok) {
                const errorText = await response.text();
                throw new Error(`Response was not ok: ${errorText}`)
            }
            return response.json();
        })
        .catch(error => {
            console.error(`catch block of insert teachers: ${error}`)
        })
    } 


    let form_title: string = ""
    let form_desc: string = ""
    let fields: FormField[] = []
    let onSubmit: (data: Record<string, any>) => void = (data) => { console.log(data); }
    if (entity == 'school') {
        form_title = 'School';
        form_desc = 'This is the School management form';
        onSubmit = insertSchool;
        fields = [
            {
                name: 'school_name',
                label: 'School Name',
                type: 'text',
                value: 'School Name',
                placeholder: 'Enter the school name',
                required: true
            },
            {
                name: 'address',
                label: 'Address',
                type: 'text',
                value: 'School Address',
                placeholder: 'Enter the school address',
                required: true
            },
            {
                name: 'phone',
                label: 'Phone',
                type: 'number',
                value: 'School Phone',
                placeholder: 'Enter the school phone number',
                required: true
            },
            {
                name: 'email',
                label: 'Email',
                type: 'email',
                value: 'School Email',
                placeholder: 'Enter the school email address',
                required: true
            },
            {
                name: 'website',
                label: 'Website',
                type: 'text',
                value: 'School Website',
                placeholder: 'Enter the school website',
                required: true
            },
            {
                name: 'school_type',
                label: 'School Type',
                type: 'select',
                value: 'School Type',
                options: ['primary', 'intermediate', 'university'],
                placeholder: 'Select the school type',
                required: true
            },
        ]
    }
    else if (entity == 'teacher') {
        form_title = 'Teacher';
        form_desc = 'This is the Teacher management form';
        onSubmit = insertTeacher;
        fields = [
            {
                name: 'teacher_name',
                label: 'Name',
                type: 'text',
                value: 'Teacher Name',
                placeholder: 'Enter the teacher name',
                required: true
            },
            {
                name: 'subjects',
                label: 'subjects',
                type: 'select',
                value: 'Teacher Subjects',
                required: true,
                options: subject_names
            },
            {
                name: 'school',
                label: 'School',
                type: 'select',
                value: 'Teacher School',
                required: true,
                options: school_ids
            }
        ]
    }
    else if (entity == 'student') {
        form_title = 'Student';
        form_desc = 'This is the Student management form';
        fields = [
            {
                name: 'student_name',
                label: 'Name',
                type: 'text',
                value: 'Student Name',
                placeholder: 'Enter the student name',
                required: true
            },
            {
                name: 'age',
                label: 'Age',
                type: 'number',
                value: 'Student Age',
                placeholder: 'Enter the student age',
                required: true
            },
            {
                name: 'grade',
                label: 'Grade',
                type: 'select',
                value: 'Student Grade',
                required: true,
                options: ['A', 'B', 'C', 'D', 'E']
            },
            {
                name: 'school',
                label: 'School',
                type: 'select',
                value: 'Student School',
                required: true,
                options: school_ids
            },
            {
                name: 'teachers',
                label: 'Teachers',
                type: 'select',
                value: 'Student Teachers',
                required: true,
                options: ['Teacher 1', 'Teacher 2', 'Teacher 3']
            }
        ]
    }
    else if (entity == 'subject') {
        form_title = 'Subject';
        form_desc = 'This is the Subject management form';
        onSubmit = insertSubject;
        fields = [
            {
                name: 'subject_name',
                label: 'Name',
                type: 'text',
                value: 'Subject Name',
                placeholder: 'Enter the subject name',
                required: true
            },
            {
                name: 'description',
                label: 'Description',
                type: 'text',
                value: 'Subject Description',
                placeholder: 'Enter the subject description',
                required: true
            },
            {
                name: 'school',
                label: 'School',
                type: 'select',
                value: 'Subject School',
                required: true,
                options: school_ids
            }
        ]
    }

    return (
        <div className="flex w-[50%] h-screen">
            <ManagementForm form_title={form_title} form_desc={form_desc} fields={fields} onSubmit={onSubmit} />
        </div>
    )
}