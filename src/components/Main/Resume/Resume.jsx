import styles from './styles.module.css';
import { format } from 'date-fns';

export const ResumeContainerComponent = ({ formSections }) => {
  return (
    <div className={styles['resume']}>
      <div className={styles['subsection']}>
        <PersonalComponent
          values={formSections[0].values[0].values}
        ></PersonalComponent>
      </div>
      {formSections.slice(1).map((section, index) => (
        <div key={section.id} className={styles['subsection']}>
          <h4>{section.title}</h4>
          <BorderComponent></BorderComponent>
          {section.values.map((entry, entryIndex) => (
            <div key={entry.id} className={styles[section.id]}>
              {section.id === 'education' && (
                <EducationInstanceComponent values={entry.values} />
              )}
              {section.id === 'workExperience' && (
                <ExperienceInstanceComponent values={entry.values} />
              )}
              {section.id === 'projects' && (
                <ProjectInstanceComponent values={entry.values} />
              )}
              {section.id === 'technicalSkills' && (
                <TechnichalSkillsComponent values={entry.values} />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const ExperienceInstanceComponent = ({ values }) => {
  const startDate = values['Start Date'];
  const endDate = values['End Date'];

  const keys = Object.keys(values);

  const descriptions = keys.filter((e) => e.includes('Description'));

  return (
    <>
      <div>
        <div>
          <p>
            {values['Company Name'] || 'Wells Fargo CIB'},{' '}
            {values.Location || 'New York, NY'}
          </p>
        </div>
        <div>
          <p>
            {startDate && (
              <>
                {format(new Date(startDate), 'MMMM')}{' '}
                {format(new Date(startDate), 'yyyy')}
                {' - '}
              </>
            )}
            {(endDate && (
              <>
                {format(new Date(endDate), 'MMMM')}{' '}
                {format(new Date(endDate), 'yyyy')}
              </>
            )) ||
              (startDate && <>Present</>)}
          </p>
        </div>
      </div>
      <div>
        <p>{values.Position || 'Analyst'}</p>
      </div>
      <div>
        <ul>
          {descriptions.map((description) => (
            <li>
              <p>{values[description]}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ProjectInstanceComponent = ({ values }) => {
  const keys = Object.keys(values);

  const descriptions = keys.filter((e) => e.includes('Description'));

  return (
    <>
      <div>
        <p>{values['Project Name']}</p>
      </div>
      <div>
        <p>{values.Website}</p>
      </div>
      <div>
        <ul>
          {descriptions.map((description) => (
            <li>
              <p>{values[description]}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const TechnichalSkillsComponent = ({ values }) => {
  return (
    <>
      <ul>
        <li>
          <p>Languages: {values.Languages}</p>
        </li>
        <li>
          <p>Frameworks and Libraries: {values['Frameworks and Libraries']}</p>
        </li>
        <li>
          <p>Tools: {values.Tools}</p>
        </li>
      </ul>
    </>
  );
};

const BorderComponent = ({}) => {
  return (
    <div className={styles['border-container']}>
      <span className={styles['border']}></span>
    </div>
  );
};

const PersonalComponent = ({ values }) => {
  return (
    <div className={`${styles.personal}`}>
      <div>
        <div>
          <p>{values.Email || 'nickmufson1@gmail.com'}</p>
        </div>
        <div>
          <p>{values['Phone Number'] || '(123) 473-4839'}</p>
        </div>
      </div>
      <div>
        <div>
          <h3>{values.Name || 'Nick Mufson'}</h3>
        </div>
        <div>
          <p>{values.Website || 'nickmufson.io'}</p>
        </div>
      </div>
      <div>
        <div>
          <p>{values.GitHub || 'github.com/nickmufson'}</p>
        </div>
        <div>
          <p>{values.LinkedIn || 'linkedin.com/nickmufson'}</p>
        </div>
      </div>
    </div>
  );
};

const EducationInstanceComponent = ({ values }) => {
  let gradDate = null;
  let monthName = null;
  let year = null;

  if (values['Expected to Graduate']) {
    gradDate = values['Expected to Graduate'];
    monthName = format(gradDate, 'MMMM');
    year = format(gradDate, 'yyyy');
  }

  //change inputs
  //city: leave as is (or maybe use location API?) so they can
  //lookup country
  //graduation dropdown: month and year
  //degree dropdown
  return (
    <>
      <div>
        <div>
          <p>
            {values['School Name'] || 'Indiana University'},{' '}
            {values.Location || 'Bloomington, IN'}
          </p>
        </div>
        <div>
          {(values['Expected to Graduate'] || true) && (
            <p>
              {monthName || 'May'} {year || '2021'}
            </p>
          )}
        </div>
      </div>
      <div>
        <div>
          <p>{values.Degree || 'Bachelor of Science in Business'}</p>
        </div>
        <div>
          {(values.GPA && <p>GPA: {values.GPA}/4.0</p>) || (
            <p>GPA: 3.85/4.00</p>
          )}
        </div>
      </div>
      <div>
        {(values.Major && <p>Major: {values.Major}</p>) || (
          <p>Major: Finance</p>
        )}
        {(values.Minor && <p>Minor: {values.Minor}</p>) || (
          <p>Minor: Mathematics</p>
        )}
      </div>
    </>
  );
};

const dateFormatterMonth = (dateValue) => {
  return format(dateValue, 'MMMM');
};

const dateFormatterYear = (dateValue) => {
  return format(dateValue, 'yyyy');
};
