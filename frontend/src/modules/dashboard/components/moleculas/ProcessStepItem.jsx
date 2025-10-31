export const ProcessStepItem = ({ number, text, completed = false }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '14px'
  }}>
    <div style={{
      width: '28px',
      height: '28px',
      borderRadius: '50%',
      background: completed ? '#0A443C' : '#21255299',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: completed ? '#0D0F21' : '#26465380',
      fontSize: '13px',
      fontWeight: '600',
      flexShrink: 0
    }}>
      <div style={{ color: 'white' }}>
        {number}
      </div>
    </div>
    <span style={{
      color: '#2C3E50',
      fontSize: '14px'
    }}>{text}</span>
  </div>
);