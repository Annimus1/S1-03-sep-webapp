export const PasswordStrengthIndicator = ({ password }) => {
  const getStrength = () => {
    let strength = 0;
    if (password.length >= 8) strength += 33;
    if (/[A-Z]/.test(password)) strength += 33;
    if (/[0-9]/.test(password) && /[!@#$%^&*]/.test(password)) strength += 34;
    return strength;
  };

  const strength = getStrength();
  const getMessage = () => {
    if (strength === 0) return { text: '', color: '' };
    if (strength < 50) return { text: 'Contraseña débil', color: '#952014' };
    if (strength < 100) return { text: 'Tu contraseña aún es débil', color: '#F39C12' };
    return { text: 'Contraseña fuerte: Excelente', color: '#0D6546' };
  };

  const message = getMessage();

  return password ? (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ 
        height: '8px', 
        backgroundColor: '#e0e0e0', 
        borderRadius: '4px', 
        overflow: 'hidden', 
        marginBottom: '6px' 
      }}>
        <div style={{
          height: '100%',
          width: `${strength}%`,
          backgroundColor: message.color,
          transition: 'all 0.3s ease'
        }} />
      </div>
      <span style={{ color: message.color, fontSize: '12px', fontWeight: '500', display: 'block' }}>
        {message.text}
      </span>
    </div>
  ) : null;
};