import React, { useState, useEffect } from "react";



interface FormField {
  name: string;
  label: string;
  type: string;
  value: string;
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

interface ManagementFormProps {
  form_title: string;
  form_desc: string;
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => void;
}

// Record is used to define the shape of an object, so Record<string, any> means that we will have an object which will have string keys and any values

export default function ManagementForm({
  form_title,
  form_desc,
  fields,
  onSubmit,
} : ManagementFormProps) {

  // console log all arguments:
  // console.log("form_title: ", form_title);
  // console.log("form_desc: ", form_desc);
  // console.log("fields: ", fields);
  // console.log("onSubmit: ", onSubmit);

const [formData, setFormData] = useState<Record<string, any>>({});
const [formError, setFormError] = useState<Record<string, string>>({});

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  if (e.target.multiple) {
    const options = Array.from((e.target as HTMLSelectElement).selectedOptions);
    setFormData({
      ...formData,
      [e.target.name]: options.map(option => option.value)
    })
  }
  else {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
  }

};

  const validateForm = () => {
    const errors: Record<string, string> = {}
    fields.forEach(field => {
      if (field.required && (!formData[field.name] || formData[field.name] === '')) {
        errors[field.name] = `${field.label} is required, it must be filled`
      }
      // check if the numeric fields are numeric and don't have alphabets
      if (field.type == 'number' && formData[field.name] && isNaN(Number(formData[field.name]))) {
        errors[field.name] = `${field.label} must be a number`
      }
      // email check
      if (field.type === 'email' && formData[field.name] && !/^\S+@\S+\.\S+$/.test(formData[field.name])) {
        errors[field.name] = `${field.label} must be a valid email address`
      }
      // url validation
      if ((field.name == 'url' || field.name == 'URL') && formData[field.name] && !/^(http|https):\/\/[a-zA-Z0-9-_.]+\.[a-zA-Z]{2,}/.test(formData[field.name])) {
        errors[field.name] = `${field.label} must be a valid URL`
      }
      // the options the user selected is one of the available options
      if (field.type === 'select' && formData[field.name] && field.options &&
        !field.options.map(String).includes(formData[field.name])
      ) {
        if (Array.isArray(formData[field.name])) {
          const not_valid = formData[field.name].some((val: string) => !field.options!.map(String).includes(val))
          if (not_valid) {
        errors[field.name] = `${field.label} must be one of the valid options`;
        }
        }
        else {
          if (!field.options.map(String).includes(formData[field.name])) {
            errors[field.name] = `${field.label} must be one of the valid options`;
          }
        }
      }

    });
  setFormError(errors);
  return Object.keys(errors).length === 0;
  };




  useEffect (() => {
    validateForm();
  }, [formData])

  useEffect (() => {
    console.log("formError: ", formError);
    console.log("formData: ", formData);
  }, [formError, formData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = validateForm();
    if (valid) {
      const submitData = { ...formData };
      if (submitData.school) {
        submitData.school = parseInt(submitData.school)
      }
      console.log(`Submit Data: ${submitData}`)
    onSubmit(submitData);
    }
  };


  return (
    <div className="main-div w-full h-full flex flex-col justify-center items-center bg-[#71afe9] gap-5">
      <h1>{form_title}</h1>
      {form_desc ? (
        <h4>{form_desc}</h4>
      ) : (
        <h4>No Description Provided</h4>
      )}
      <form onSubmit={handleSubmit}>
        {fields.map(field => (
          field.type === 'select' ? (
            <div key={field.name} className="flex justify-between">
              <label>{field.label}</label>
              <select 
              name={field.name} 
              onChange={handleChange}
              value={formData[field.name] ||  ""}
              multiple={field.name === 'subjects'}
              
              >
                <option value="" disabled>Select an option</option>
                {field.options?.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          ) : (
            <div key={field.name} className="flex justify-between">
              <label>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                placeholder={field.placeholder}
                onChange={handleChange}
              />
            </div>
          )
        ))}

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
      </form>

    </div>



  );
}

