export const Input = ({ value, onChange, prefix, suffix, readOnly = false, type = 'text' }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '12px 16px',
      gap: '8px'
    }}>
      {prefix && <span style={{ color: '#333', fontWeight: '500' }}>{prefix}</span>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        style={{
          border: 'none',
          outline: 'none',
          flex: 1,
          fontSize: '16px',
          color: '#333',
          fontWeight: '500',
          backgroundColor: 'transparent',
          cursor: readOnly ? 'default' : type === 'month' ? 'pointer' : 'text'
        }}
      />
      {suffix && <span style={{ color: '#666', fontSize: '14px' }}>{suffix}</span>}
    </div>
  );
};
