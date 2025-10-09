
/**
 * Componente ErrorText
 * Muestra mensajes de error en color rojo
 * 
 * @param {ReactNode} children - Mensaje de error a mostrar
 * @returns {JSX.Element} Texto de error estilizado
 */

export const ErrorText = ({ children }) => (
  <p styles={
    {
      color: '#952014',
      fontSize: '13px',
      margin: '8px 0 0 0',
      fontWeight: '500',
    }
  }>
    {children}
  </p>
)