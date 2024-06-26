import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default App;
//sections
//general info
//educational experience
//work experience

function Main() {
  return (
    <main>
      <MainInputArea></MainInputArea>
      <div>
        <Resume></Resume>
      </div>
    </main>
  );
}

function Header() {
  return (
    <header>
      <div>
        <h1>CV Generator</h1>
      </div>
    </header>
  );
}

const MainInputArea = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const personalInputs = {
    //string user for single line input
    Name: { type: 'text', required: true, maxLength: 50 },
    Email: { type: 'email', required: true, maxLength: 50 },
    'Phone Number': { type: 'tel', required: false },
    //text type used for multiline text input
    Address: { type: 'text', required: false, maxLength: 200 },
  };
  const eductationInputs = {
    'School Name': { type: 'text', required: true, maxLength: 50 },
    Degree: { type: 'text', required: true },
    Location: { type: 'text', required: true, maxLength: 50 },
    'Start Date': { type: 'date', required: true },
    'End Date': { type: 'date', required: false },
    Major: { type: 'text', required: true, maxLength: 50 },
    Minor: { type: 'text', required: false },
    GPA: { type: 'number', required: true, step: '0.01', min: '0', max: '4.0' },
  };

  const workExperienceInputs = {
    'Company Name': { type: 'text', required: true, maxLength: 50 },
    Location: { type: 'text', required: true, maxLength: 150 },
    Description: { type: 'text', required: false },
    'Start Date': { type: 'date', required: true },
    'End Date': { type: 'date', required: false },
  };

  const projectInputs = {
    'Project Name': { type: 'text', required: true, maxLength: 50 },
    Description: { type: 'text', required: true, maxLength: 150 },
  };

  const technicalSkillsInputs = {
    Languages: { type: 'text', required: true, maxLength: 100 },
    'Frameworks and Libraries': {
      type: 'text',
      required: true,
      maxLength: 100,
    },
    Tools: { type: 'text', required: true, maxLength: 50 },
  };

  return (
    <div>
      <SectionComponent
        title="Personal Info"
        isOpen={openIndex === 0}
        onClick={() => toggleOpen(0)}
        fullForm={personalInputs}
      />
      <SectionComponent
        title="Education"
        isOpen={openIndex === 1}
        onClick={() => toggleOpen(1)}
        fullForm={eductationInputs}
      />
      <SectionComponent
        title="Work Experience"
        isOpen={openIndex === 2}
        onClick={() => toggleOpen(2)}
        fullForm={workExperienceInputs}
      />
      <SectionComponent
        title="Projects"
        isOpen={openIndex === 3}
        onClick={() => toggleOpen(3)}
        fullForm={projectInputs}
      />
      <SectionComponent
        title="Technical Skills"
        isOpen={openIndex === 4}
        onClick={() => toggleOpen(4)}
        fullForm={technicalSkillsInputs}
      />
    </div>
  );
};

const SectionComponent = ({ title, isOpen, onClick, fullForm }) => {
  let openContent = null;

  const keys = Object.keys(fullForm);

  if (isOpen) {
    openContent = keys.map((key) => (
      <InputComponent
        key={key}
        fieldName={key}
        type={key.type}
        required={key.required}
        maxLength={key.maxLength || null}
      ></InputComponent>
    ));
  }

  return (
    <div>
      <h3 onClick={onClick}>{title}</h3>
      {openContent}
    </div>
  );
};

// const EducationForm

// const ProjectsForm

const InputComponent = ({ fieldName, type, required, maxLength }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div key={fieldName}>
      <label>{fieldName}:</label>
      <input
        id={fieldName}
        type={type}
        required={required}
        maxLength={maxLength}
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};

const Resume = () => {
  return (
    <div>
      <div className="personal"></div>
      <div className="eudcation"></div>
      <div className="employment"></div>
      <div className="projects"></div>
      <div className="skills"></div>
    </div>
  );
};
