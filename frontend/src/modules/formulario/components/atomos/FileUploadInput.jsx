import { useState, useRef } from "react";

export const FileUploadInput = ({ 
  label, 
  name, 
  placeholder, 
  error, 
  required = false,
  maxSize = 5,
  acceptedFormats = '.pdf',
  onChange 
}) => {
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tamaño
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxSize) {
        onChange(name, null, `El archivo excede el tamaño máximo de ${maxSize}MB`);
        setFileName('');
        return;
      }

      // Validar formato
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      if (!acceptedFormats.includes(fileExtension)) {
        onChange(name, null, `Formato no permitido. Solo se acepta: ${acceptedFormats}`);
        setFileName('');
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
    <div className="file-upload-container">
      <label className="file-upload-label">
        {label}
        {required && <span className="required-asterisk">*</span>}
      </label>
      <div className={`file-upload-input ${error ? 'error' : ''}`}>
        <span className="file-upload-placeholder">
          {fileName || placeholder}
        </span>
        <button 
          type="button" 
          className="upload-icon-button"
          onClick={handleUploadClick}
          aria-label="Subir archivo"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
          </svg>
        </button>
      </div>
      {error && <span className="file-upload-error">{error}</span>}
      <input 
        ref={fileInputRef}
        type="file" 
        name={name}
        accept={acceptedFormats}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      
      <style jsx>{`
        .file-upload-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
        }

        .file-upload-label {
          font-size: 14px;
          font-weight: 500;
          color: #1a3a3a;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .required-asterisk {
          color: #f59e0b;
          font-size: 16px;
        }

        .file-upload-input {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: white;
          border: 1px solid #d1d5db;
          border-radius: 80px;
          height: 50px;
          padding: 12px 16px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .file-upload-input:hover {
          border-color: #9ca3af;
        }

        .file-upload-input.error {
          border-color: #ef4444;
        }

        .file-upload-placeholder {
          font-size: 14px;
          color: #6b7280;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .upload-icon-button {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
          transition: color 0.2s;
          padding: 4px;
        }

        .upload-icon-button:hover {
          color: #1a3a3a;
        }

        .file-upload-error {
          font-size: 12px;
          color: #ef4444;
          margin-top: -4px;
        }
      `}</style>
    </div>
  );
};