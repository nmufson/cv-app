import React from 'react';
import { useState } from 'react';
import styles from './styles.module.css';

export const InputContainerComponent = ({
  formConfigs,
  toggleSectionOpen,
  openIndex,
  updateFormValues,
  addFormValue,
}) => {
  return (
    <div className={styles['input-container']}>
      {formConfigs.map((config) => (
        <InputSection
          key={config.id}
          configId={config.id}
          configTitle={config.title}
          configInputs={config.inputs}
          toggleSectionOpen={toggleSectionOpen}
          openIndex={openIndex}
          updateFormValues={updateFormValues}
          addFormValue={addFormValue}
        />
      ))}
    </div>
  );
};

//now that we've passed down the update and add form functions
//need to implemenet them
const InputSection = ({
  configId,
  configTitle,
  formConfigs,
  configInputs,
  toggleSectionOpen,
  openIndex,
  updateFormValues,
  addFormValue,
}) => {
  //!!!!
  //each FormComponent will need a key to identify it
  //!!!!
  return (
    <div className={styles['input-section']}>
      <h2>{configTitle}</h2>
      <FormComponent
        configId={configId}
        configInputs={configInputs}
      ></FormComponent>
    </div>
  );
};

export const FormComponent = ({ configId, configInputs }) => {
  const inputNamesArray = Object.keys(configInputs);

  //the order of these inputs won't change, so we can use index
  //for part of the key
  return (
    <div className={`${configId}-form`}>
      {inputNamesArray.map((inputName, index) => (
        <div key={`${configId}-${index}`}>
          <label>{inputName}</label>
          <input
            type={configInputs[inputName].type}
            required={configInputs[inputName].required}
            maxLength={configInputs[inputName].maxLength}
            step={configInputs[inputName].step}
            min={configInputs[inputName].min}
            max={configInputs[inputName].max}
          ></input>
        </div>
      ))}
    </div>
  );
};
