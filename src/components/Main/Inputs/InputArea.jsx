import React from 'react';
import { useState } from 'react';
import styles from './styles.module.css';

export const InputContainerComponent = ({
  formSections,
  toggleOpenSection,
  openIndex,
  updateFormValues,
  addFormValue,
  removeEntry,
}) => {
  return (
    <div className={styles['input-container']}>
      {formSections.map((section, index) => (
        <InputSection
          key={section.id}
          sectionId={section.id}
          sectionTitle={section.title}
          sectionInputs={section.inputs}
          formValues={section.values}
          sectionIndex={index}
          openIndex={openIndex}
          toggleOpenSection={() => toggleOpenSection(index)}
          updateFormValues={updateFormValues}
          addFormValue={addFormValue}
          removeEntry={removeEntry}
        />
      ))}
    </div>
  );
};

//now that we've passed down the update and add form functions
//need to implemenet them
const InputSection = ({
  sectionId,
  sectionTitle,
  sectionInputs,
  formValues,
  toggleOpenSection,
  sectionIndex,
  openIndex,
  updateFormValues,
  addFormValue,
  removeEntry,
}) => {
  //!!!!
  //each FormComponent will need a key to identify it
  //!!!!

  const [openEntry, setOpenEntry] = useState(0);

  const toggleOpenEntry = (entryIndex) => {
    if (openEntry === entryIndex) return;
    setOpenEntry(entryIndex);
  };

  const isOpen = openIndex === sectionIndex;

  return (
    <div className={styles['input-section']}>
      <h2 onClick={toggleOpenSection}>{sectionTitle}</h2>
      {isOpen && (
        <>
          {formValues.map((entry, index) => (
            <FormComponent
              key={entry.id}
              sectionId={sectionId}
              sectionInputs={sectionInputs}
              sectionIndex={sectionIndex}
              entry={entry}
              entryIndex={index}
              updateFormValues={updateFormValues}
              removeEntry={removeEntry}
              openEntry={openEntry}
              toggleOpenEntry={toggleOpenEntry}
            />
          ))}
          <button onClick={toggleOpenSection}>Close</button>

          <button onClick={() => addFormValue(sectionId)}>Add Entry</button>
          {/* save will turn the inputs into display text 
          and an edit button */}
          <button>Save</button>
        </>
      )}
    </div>
  );
};

export const FormComponent = ({
  sectionId,
  sectionInputs,
  entry,
  entryIndex,
  updateFormValues,
  removeEntry,
  openEntry,
  toggleOpenEntry,
}) => {
  const isOpenEntry = openEntry === entryIndex;

  const inputNamesArray = Object.keys(sectionInputs);

  const handleInputChange = (event, inputName) => {
    const { value } = event.target;
    updateFormValues(sectionId, entry.id, { [inputName]: value });
  };

  //the order of these inputs won't change, so we can use index
  //for part of the key
  return (
    <div
      className={`${sectionId}-form`}
      onClick={() => toggleOpenEntry(entryIndex)}
    >
      {isOpenEntry &&
        inputNamesArray.map((inputName, index) => (
          <div key={`${sectionId}-${index}`}>
            <label>{inputName}</label>
            <input
              type={sectionInputs[inputName].type}
              required={sectionInputs[inputName].required}
              maxLength={sectionInputs[inputName].maxLength}
              step={sectionInputs[inputName].step}
              min={sectionInputs[inputName].min}
              max={sectionInputs[inputName].max}
              value={entry.values[inputName] || ''}
              onChange={(event) => handleInputChange(event, inputName)}
            ></input>
          </div>
        ))}
      {!isOpenEntry &&
        inputNamesArray.map((inputName, index) => (
          <div key={`${sectionId}-${index}`}>
            <label>{inputName}</label>
            <p>{entry.values[inputName]}</p>
          </div>
        ))}
      <button onClick={() => removeEntry(sectionId, entryIndex)}>Remove</button>
    </div>
  );
};
