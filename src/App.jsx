import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/main';

export function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Main />
    </>
  );
}

//sections
//general info
//educational experience
//work experience

// const EducationForm

// const ProjectsForm
