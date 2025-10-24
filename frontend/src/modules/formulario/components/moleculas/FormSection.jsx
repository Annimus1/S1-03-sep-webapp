export const FormSection = ({ title, children }) => {
  return (
    <div className="form-section">
      <h2 className="form-section-title">{title}</h2>
      <div className="form-section-content">
        {children}
      </div>
      
      <style jsx>{`
        .form-section {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-section-title {
          font-size: 24px;
          font-weight: 700;
          color: #1a3a3a;
          margin: 0;
        }

        .form-section-content {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        @media (max-width: 768px) {
          .form-section-content {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};