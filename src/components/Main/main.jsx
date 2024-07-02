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
  const [formSections, setFormSections] = useState([
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
      values: [{ id: Date.now(), values: {} }],
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
      values: [{ id: Date.now(), values: {} }],
    },
    {
      id: 'workExperience',
      title: 'Work Experience',
      inputs: {
        'Company Name': { type: 'text', required: true, maxLength: 50 },
        Location: { type: 'text', required: true, maxLength: 150 },
        Description0: { type: 'text', required: false, maxLength: 150 },
        Description1: { type: 'text', required: false, maxLength: 150 },
        Description2: { type: 'text', required: false, maxLength: 150 },
        'Start Date': { type: 'date', required: true },
        'End Date': { type: 'date', required: false },
      },
      values: [{ id: Date.now(), values: {} }],
    },
    {
      id: 'projects',
      title: 'Projects',
      inputs: {
        'Project Name': { type: 'text', required: true, maxLength: 50 },
        Description: { type: 'text', required: true, maxLength: 150 },
        Date: { type: 'date', required: true },
        Description0: { type: 'text', required: false },
        Description1: { type: 'text', required: false },
        Description2: { type: 'text', required: false },
        Description3: { type: 'text', required: false },
      },
      values: [
        { id: Date.now(), values: {} },
        { id: Date.now() + 1, values: {} },
      ],
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
      values: [{ id: Date.now(), values: {} }],
    },
  ]);

  const updateFormValues = (sectionId, entryId, newValues) => {
    setFormSections((prevSections) =>
      prevSections.map((section) => {
        if (section.id === sectionId) {
          const updatedValues = section.values.map((entry) =>
            entry.id === entryId
              ? { ...entry, values: { ...entry.values, ...newValues } }
              : entry
          );
          return { ...section, values: updatedValues };
        }
        return section;
      })
    );
  };

  const addFormValue = (sectionId) => {
    setFormSections((prevSections) =>
      prevSections.map((section) => {
        if (section.id === sectionId) {
          const newEntry = { id: Date.now(), values: {} };
          return { ...section, values: [...section.values, newEntry] };
        }
        return section;
      })
    );
  };

  const removeEntry = (sectionId, entryIndex) => {
    setFormSections((prevSections) =>
      prevSections.map((section) => {
        if (section.id === sectionId) {
          const updatedValues = [...section.values];
          updatedValues.splice(entryIndex, 1); // Remove element at entryIndex
          return { ...section, values: updatedValues };
        }
        return section;
      })
    );
  };

  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpenSection = (sectionIndex) => {
    setOpenIndex(openIndex === sectionIndex ? null : sectionIndex);
  };

  //CSS modules
  return (
    <div className={styles['main']}>
      <div className={styles['left-side']}>
        <InputContainerComponent
          formSections={formSections}
          toggleOpenSection={toggleOpenSection}
          openIndex={openIndex}
          updateFormValues={updateFormValues}
          addFormValue={addFormValue}
          removeEntry={removeEntry}
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
