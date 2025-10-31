import { useState } from "react";
import styles from "./TextInput.module.css";

export const TextInput = ({
  label,
  name,
  value = "",
  placeholder = "",
  required = false,
  error,
  onChange,
  type = "text",
}) => {
  const [focused, setFocused] = useState(false);

  const handleChange = (e) => {
    onChange(name, e.target.value);
  };

  return (
    <div className={styles.textInputContainer}>
      {label && (
        <label htmlFor={name} className={styles.textInputLabel}>
          {label}
          {required && <span className={styles.requiredAsterisk}>*</span>}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={handleChange}
        className={`${styles.textInputField} ${error ? styles.error : ""} ${
          focused ? styles.focused : ""
        }`}
      />

      {error && <span className={styles.textInputError}>{error}</span>}
    </div>
  );
};
