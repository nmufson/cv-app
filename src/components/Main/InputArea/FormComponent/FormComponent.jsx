import React from 'react';
import { useState } from 'react';
import styles from './styles.module.css';

export const FormComponent = ({
  inputConfig,
  formValues,
  handleChange,
  isOpen,
}) => {
  let openContent = null;

  const inputNames = Object.keys(inputConfig);

  if (isOpen) {
    openContent = inputNames.map((inputName) => (
      <div key={inputName}>
        <label>{inputName}</label>
        <input
          type={inputConfig[inputName].type}
          name={inputName}
          value={formValues[inputName] || ''}
          onChange={handleChange}
          required={inputConfig[inputName].required}
          maxLength={inputConfig[inputName].maxLength}
          step={inputConfig[inputName].step}
          min={inputConfig[inputName].min}
          max={inputConfig[inputName].max}
        />
      </div>
    ));
  }

  return (
    <form>
      {openContent}
      <button type="submit">Save</button>
    </form>
  );
};
