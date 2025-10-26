import styles from "./FormSection.module.css";

export const FormSection = ({ title, children }) => {
  return (
    <div className={styles.formSection}>
      <h2 className={styles.formSectionTitle}>{title}</h2>
      <div className={styles.formSectionContent}>{children}</div>
    </div>
  );
};
