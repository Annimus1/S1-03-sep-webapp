export const BackButton = ({ onClick }) => {
  return (
    <button className="back-button" onClick={onClick}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      
      <style jsx>{`
        .back-button {
          background: #1a3a3a;
          border: none;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: white;
          transition: background 0.2s;
        }

        .back-button:hover {
          background: #0f2626;
        }
      `}</style>
    </button>
  );
};