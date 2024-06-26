import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '../../App.jsx';
import { InputArea } from '../InputArea/InputArea.jsx';
import { Resume } from '../Resume/Resume.jsx';
import '../../index.css';
import styles from './styles.module.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export function Main() {
  return (
    <main className={styles['main']}>
      <InputArea></InputArea>
      <div>
        <Resume></Resume>
      </div>
    </main>
  );
}
