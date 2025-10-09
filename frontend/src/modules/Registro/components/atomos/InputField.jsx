export const InputField = ({ label, type = "text", placeholder, value, onChange, error, ...props }) => (
  <div style={{ marginBottom: '20px' }}>
    {label && <label style={{ 
      display: 'block', 
      fontSize: '14px', 
      fontWeight: '500', 
      color: '#1a1a1a', 
      marginBottom: '6px' 
    }}>{label}</label>}
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        width: '100%',
        borderRadius: '8px',
        border: error ? '1px solid #dc3545' : '1px solid #e0e0e0',
        padding: '12px 16px',
        fontSize: '15px',
        backgroundColor: '#f8f9fa',
        transition: 'all 0.3s ease',
        outline: 'none'
      }}
      {...props}
    />
    {error && <span style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px', display: 'block' }}>{error}</span>}
  </div>
);
