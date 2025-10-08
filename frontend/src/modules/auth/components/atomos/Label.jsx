import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Componente Label para formularios
 * Etiqueta estilizada para inputs
 * 
 * @param {ReactNode} children - Contenido de la etiqueta
 * @param {string} htmlFor - ID del input asociado
 * @returns {JSX.Element} Label estilizado
 */

export const Label = (
  {
    children,
    htmlFor
  }
) => (
  <label
    htmlFor={htmlFor}
    style={{
      fontSize: '14px',
      fontWeight: '600',
      color: '#2D3748',
      marginBottom: '8px',
      display: 'block'
    }}
  >
    {children}
  </label>
);