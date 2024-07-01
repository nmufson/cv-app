import styles from './styles.module.css';
import { format } from 'date-fns';

export const ResumeContainer = () => {
  return <div className={styles['resume']}></div>;
};

const subSectionComponent = () => {};

const PersonalComponent = ({ formValues }) => {
  return (
    <div className={styles['personal']}>
      <div>
        <div>
          <p>{formValues.Email}</p>
        </div>
        <div>
          <p>{formValues['Phone Number']}</p>
        </div>
      </div>
      <div>
        <div>
          <h3>{formValues.Name}</h3>
        </div>
        <div>
          <p>{formValues.Website}</p>
        </div>
      </div>
      <div>
        <div>
          <p>{formValues.GitHub}</p>
        </div>
        <div>
          <p>{formValues.LinkedIn}</p>
        </div>
      </div>
    </div>
  );
};

//could probably simply reuse these if there are multiple
//education inputs, experience, projects etc
//map over values and display one of each
const EducationInstanceComponent = ({ formValues }) => {
  let gradDate = null;
  let monthName = null;
  let year = null;

  if (formValues['Expected to Graduate']) {
    gradDate = formValues['Expected to Graduate'];
    monthName = format(gradDate, 'MMMM');
    year = format(gradDate, 'yyyy');
  }

  return (
    <div className={styles['education']}>
      <div>
        <div>
          <p>
            {formValues['School Name']}, {formValues.Location}
          </p>
        </div>
        <div>
          {formValues['Expected to Graduate'] && (
            <p>
              {monthName} {year}
            </p>
          )}
        </div>
      </div>
      <div>
        <div>
          <p>{formValues.Degree}</p>
        </div>
        <div>{formValues.GPA && <p>GPA: {formValues.GPA}/4.0</p>}</div>
      </div>
      <div>
        {formValues.Major && <p>Major: {formValues.Major}</p>}
        {formValues.Minor && <p>Minor: {formValues.Minor}</p>}
      </div>
    </div>
  );
};

const ExperienceInstanceComponent = ({ formValues }) => {
  return <div className={styles['experience']}></div>;
};

const ExperienceOrProjectInstanceComponent = () => {};
