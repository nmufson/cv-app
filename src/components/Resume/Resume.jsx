import styles from './styles.module.css';

export const Resume = () => {
  return (
    <div className={styles['resume-container']}>
      <div className="personal"></div>
      <div className="eudcation"></div>
      <div className="employment"></div>
      <div className="projects"></div>
      <div className="skills"></div>
    </div>
  );
};
