export const Placeholder = ({ children, height = '200px', text = 'Placeholder' }) => (
  <div style={{
    background: '#FF4444',
    border: '3px dashed #CC0000',
    borderRadius: '20px',
    padding: '20px',
    minHeight: height,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: '16px',
    textAlign: 'center'
  }}>
    {children || text}
  </div>
);