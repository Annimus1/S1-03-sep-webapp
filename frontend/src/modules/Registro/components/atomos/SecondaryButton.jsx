export const SecondaryButton = ({ children, onClick, active }) => (
  <button
    onClick={onClick}
    style={{
      backgroundColor: active ? '#0d5047' : 'transparent',
      border: active ? 'none' : '1px solid #0d5047',
      color: active ? 'white' : '#0d5047',
      borderRadius: '25px',
      padding: '10px 32px',
      fontSize: '15px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    }}
  >
    {children}
  </button>
);
