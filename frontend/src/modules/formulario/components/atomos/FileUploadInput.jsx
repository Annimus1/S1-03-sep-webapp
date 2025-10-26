import { useState, useRef } from "react";
import styles from "./FileUploadInput.module.css";

export const FileUploadInput = ({
  label,
  name,
  placeholder,
  error,
  required = false,
  maxSize = 5,
  acceptedFormats = ".pdf",
  onChange,
}) => {
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tamaño
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxSize) {
        onChange(name, null, `El archivo excede el tamaño máximo de ${maxSize}MB`);
        setFileName("");
        return;
      }

      // Validar formato
      const fileExtension = "." + file.name.split(".").pop().toLowerCase();
      if (!acceptedFormats.includes(fileExtension)) {
        onChange(name, null, `Formato no permitido. Solo se acepta: ${acceptedFormats}`);
        setFileName("");
        return;
      }

      setFileName(file.name);
      onChange(name, file, null);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.fileUploadContainer}>
      <label className={styles.fileUploadLabel}>
        {label}
        {required && <span className={styles.requiredAsterisk}>*</span>}
      </label>

      <div
        className={`${styles.fileUploadInput} ${error ? styles.error : ""}`}
      >
        <span className={styles.fileUploadPlaceholder}>
          {fileName || placeholder}
        </span>
        <button
          type="button"
          className={styles.uploadIconButton}
          onClick={handleUploadClick}
          aria-label="Subir archivo"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
          </svg>
        </button>
      </div>

      {error && <span className={styles.fileUploadError}>{error}</span>}

      <input
        ref={fileInputRef}
        type="file"
        name={name}
        accept={acceptedFormats}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
};
