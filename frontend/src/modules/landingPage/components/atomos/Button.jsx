/**
 * Componente reutilizable de botón
 * @param {string} children - Texto que se muestra dentro del botón
 * @param {string} variant - Estilo del botón: 'primary' (naranja) o 'secondary' (morado)
 * @param {function} onClick - Función que se ejecuta al hacer clic
 * @param {string} className - Clases CSS adicionales
 */
export function Button ({ children, variant = 'primary', onClick, className = '' }) {
  const styles = {
    primary: { backgroundColor: '#FFA726', border: 'none', color: 'white', borderRadius: 25, padding: '12px 30px', fontWeight: 600, fontSize: '14px' },
    secondary: { backgroundColor: '#7B1FA2', border: 'none', color: 'white', borderRadius: 25, padding: '12px 30px', fontWeight: 600, fontSize: '14px' }
  };
  
  return (
    <button className={`btn w-100 w-md-auto ${className}`} style={styles[variant]} onClick={onClick}>
      {children}
    </button>
  );
};