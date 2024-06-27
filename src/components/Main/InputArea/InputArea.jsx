import React from 'react';
import { useState } from 'react';
import styles from './styles.module.css';
import { FormComponent } from './FormComponent/FormComponent';

export const InputArea = ({ formConfigs, formValues, handleChange }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles['input-area-container']}>
      {formConfigs.map((formConfig) => (
        <div key={formConfig.id}>
          <h3>Form {formConfig.title}</h3>
          <FormComponent
            isOpen={openIndex === 0}
            onClick={() => toggleOpen(0)}
            inputConfig={formConfig.inputs}
            formValues={formValues[formConfig.id]}
            handleChange={(e) => handleChange(e)}
          />
        </div>
      ))}
    </div>
  );
};
