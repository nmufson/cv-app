import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '../../App.jsx';
import { ResumeContainer } from './Resume/Resume.jsx';
import { InputContainerComponent } from './Inputs/InputArea.jsx';
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
      id: 'personal',
      title: 'Personal',
      inputs: {
        Name: { type: 'text', required: true, maxLength: 50 },
        Email: { type: 'email', required: true, maxLength: 50 },
        'Phone Number': { type: 'tel', required: false },
        Website: { type: 'text', required: false, maxLength: 50 },
        GitHub: { type: 'text', required: false, maxLength: 50 },
        LinkedIn: { type: 'text', required: false, maxLength: 50 },
      },
    },
    {
      id: 'education',
      title: 'Education',
      inputs: {
        'School Name': { type: 'text', required: true, maxLength: 50 },
        Location: { type: 'text', required: true, maxLength: 50 },
        Degree: { type: 'text', required: true },
        'Expected to Graduate': { type: 'date', required: true },
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
      id: 'workExperience',
      title: 'Work Experience',
      inputs: {
        'Company Name': { type: 'text', required: true, maxLength: 50 },
        Location: { type: 'text', required: true, maxLength: 150 },
        Description0: { type: 'text', required: false },
        Description1: { type: 'text', required: false },
        Description2: { type: 'text', required: false },
        Description3: { type: 'text', required: false },
        'Start Date': { type: 'date', required: true },
        'End Date': { type: 'date', required: false },
      },
    },
    {
      id: 'projects',
      title: 'Projects',
      inputs: {
        'Project Name': { type: 'text', required: true, maxLength: 50 },
        Description: { type: 'text', required: true, maxLength: 150 },
        Date: { type: 'date', required: true },
      },
    },
    {
      id: 'technicalSkills',
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

  const [formValues, setFormValues] = useState([
    {
      id: 'personal',
      title: 'Personal',
      values: {},
    },
    {
      id: 'education',
      title: 'Education',
      values: [],
    },
    {
      id: 'workExperience',
      title: 'Work Experience',
      values: [],
    },
    {
      id: 'projects',
      title: 'Projects',
      values: [],
    },
    {
      id: 'technicalSkills',
      title: 'Technical Skills',
      values: [],
    },
  ]);

  const updateFormValues = (sectionId, valueId, newValues) => {
    setFormValues((prevFormValues) =>
      prevFormValues.map((section) => {
        if (section.id === sectionId) {
          if (Array.isArray(section.values)) {
            const updatedValues = section.values.map((item) =>
              item.id === valueId ? { ...item, ...newValues } : item
            );
            return { ...section, values: updatedValues };
          } else {
            return { ...section, values: { ...section.values, ...newValues } };
          }
        }
        return section;
      })
    );
  };

  const addFormValue = (sectionId, newValue) => {
    setFormValues((prevFormValues) =>
      prevFormValues.map((section) => {
        if (section.id === sectionId) {
          if (Array.isArray(section.values)) {
            const newEntry = { id: Date.now(), ...newValue };
            return { ...section, values: [...section.values, newEntry] };
          }
        }
        return section;
      })
    );
  };

  const [openIndex, setOpenIndex] = useState(null);

  const toggleSectionOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  //CSS modules
  return (
    <div className={styles['main']}>
      <div className={styles['left-side']}>
        <InputContainerComponent
          formConfigs={formConfigs}
          toggleSectionOpen={toggleSectionOpen}
          openIndex={openIndex}
          updateFormValues={updateFormValues}
          addFormValue={addFormValue}
        ></InputContainerComponent>
      </div>
      <div className={styles['right-side']}>
        <ResumeContainer></ResumeContainer>
      </div>
    </div>
  );
}

function MainComponent() {
  const [items, setItems] = useState([
    { id: 1, value: 'Item 1' },
    { id: 2, value: 'Item 2' },
    { id: 3, value: 'Item 3' },
  ]);

  const handleUpdate = (id, newValue) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, value: newValue } : item
      )
    );
  };

  return (
    <div>
      <ListComponentA items={items} onUpdate={handleUpdate} />
      <ListComponentB items={items} onUpdate={handleUpdate} />
    </div>
  );
}

function ListComponentA({ items, onUpdate }) {
  return (
    <div>
      <h2>List A</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.value}
            <button
              onClick={() => onUpdate(item.id, item.value + ' (updated in A)')}
            >
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ListComponentB({ items, onUpdate }) {
  return (
    <div>
      <h2>List B</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.value}
            <button
              onClick={() => onUpdate(item.id, item.value + ' (updated in B)')}
            >
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const formConfigs = [
  {
    id: 'personal',
    title: 'Personal',
    inputs: {
      Name: { type: 'text', required: true, maxLength: 50 },
      Email: { type: 'email', required: true, maxLength: 50 },
      'Phone Number': { type: 'tel', required: false },
      Website: { type: 'text', required: false, maxLength: 50 },
      GitHub: { type: 'text', required: false, maxLength: 50 },
      LinkedIn: { type: 'text', required: false, maxLength: 50 },
    },
  },
  {
    id: 'education',
    title: 'Education',
    inputs: {
      'School Name': { type: 'text', required: true, maxLength: 50 },
      Location: { type: 'text', required: true, maxLength: 50 },
      Degree: { type: 'text', required: true },
      'Expected to Graduate': { type: 'date', required: true },
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
    id: 'workExperience',
    title: 'Work Experience',
    inputs: {
      'Company Name': { type: 'text', required: true, maxLength: 50 },
      Location: { type: 'text', required: true, maxLength: 150 },
      Description0: { type: 'text', required: false },
      Description1: { type: 'text', required: false },
      Description2: { type: 'text', required: false },
      Description3: { type: 'text', required: false },
      'Start Date': { type: 'date', required: true },
      'End Date': { type: 'date', required: false },
    },
  },
  {
    id: 'projects',
    title: 'Projects',
    inputs: {
      'Project Name': { type: 'text', required: true, maxLength: 50 },
      Description: { type: 'text', required: true, maxLength: 150 },
      Date: { type: 'date', required: true },
    },
  },
  {
    id: 'technicalSkills',
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
