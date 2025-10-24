import { InfoIcon } from "../atomos/InfoIcon";

export const FormFieldWithInfo = ({ label, required, info, children }) => {
  return (
    <div className="form-field-with-info">
      <div className="field-header">
        <span className="field-label">
          {label}
          {required && <span className="required-asterisk">*</span>}
        </span>
        {info && (
          <div className="info-icon-wrapper" title={info}>
            <InfoIcon />
          </div>
        )}
      </div>
      {children}
      
      <style jsx>{`
        .form-field-with-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .field-header {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .field-label {
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

        .info-icon-wrapper {
          display: flex;
          align-items: center;
          color: #1e5a5a;
          cursor: help;
        }
      `}</style>
    </div>
  );
};