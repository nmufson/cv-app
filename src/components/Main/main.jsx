import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '../../App.jsx';
import { InputArea } from './InputArea/InputArea.jsx';
import { Resume } from './Resume/Resume.jsx';
import { useState } from 'react';
import '../../index.css';
import styles from './styles.module.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//main needs to control the state of the updated info
//to communicate betweem input and resume areas
export function Main() {
  const formConfigs = [
    {
      id: 'personalInputs',
      title: 'Personal',
      inputs: {
        Name: { type: 'text', required: true, maxLength: 50 },
        Email: { type: 'email', required: true, maxLength: 50 },
        'Phone Number': { type: 'tel', required: false },
        Address: { type: 'text', required: false, maxLength: 200 },
      },
    },
    {
      id: 'educationInputs',
      title: 'Education',
      inputs: {
        'School Name': { type: 'text', required: true, maxLength: 50 },
        Degree: { type: 'text', required: true },
        Location: { type: 'text', required: true, maxLength: 50 },
        'Start Date': { type: 'date', required: true },
        'End Date': { type: 'date', required: false },
        Major: { type: 'text', required: true, maxLength: 50 },
        Minor: { type: 'text', required: false },
        GPA: {
          type: 'number',
          required: true,
          step: '0.01',
          min: '0',
          max: '4.0',
        },
      },
    },
    {
      id: 'workExperienceInputs',
      title: 'Work Experience',
      inputs: {
        'Company Name': { type: 'text', required: true, maxLength: 50 },
        Location: { type: 'text', required: true, maxLength: 150 },
        Description: { type: 'text', required: false },
        'Start Date': { type: 'date', required: true },
        'End Date': { type: 'date', required: false },
      },
    },
    {
      id: 'projectInputs',
      title: 'Projects',
      inputs: {
        'Project Name': { type: 'text', required: true, maxLength: 50 },
        Description: { type: 'text', required: true, maxLength: 150 },
      },
    },
    {
      id: 'technicalSkillsInputs',
      title: 'Technical Skills',
      inputs: {
        Languages: { type: 'text', required: true, maxLength: 100 },
        'Frameworks and Libraries': {
          type: 'text',
          required: true,
          maxLength: 100,
        },
        Tools: { type: 'text', required: true, maxLength: 50 },
      },
    },
  ];

  const [formValues, setFormValues] = useState({
    personalInputs: {},
    educationInputs: {},
    workExperienceInputs: {},
    projectInputs: {},
    technicalSkillsInputs: {},
  });

  const handleChange = (formId, e) => {
    const { name, value } = e.target;
    setFormValues({
      //creates a shallow copy of form values
      ...formValues,
      [formId]: {
        //creates shallow copy of whichever section of formValues
        //we are updating
        //updates state in an immutable manner, ensuring rest of state
        //remains unchanged
        ...formValues[formId],
        [name]: value,
      },
    });
  };

  return (
    <main className={styles['main']}>
      <InputArea
        formConfigs={formConfigs}
        formValues={formValues}
        handleChange={(e) => handleChange(formConfigs.id, e)}
      ></InputArea>
      <Resume></Resume>
    </main>
  );
}
