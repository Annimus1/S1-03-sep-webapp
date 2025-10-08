
/**
 * Componente HelpText
 * Muestra texto de ayuda o información adicional
 * 
 * @param {ReactNode} children - Texto de ayuda a mostrar
 * @returns {JSX.Element} Texto de ayuda estilizado en gris
 */

export const HelpText = ({ children }) => (

  <p style={
    {
      color: '#718096',
      fontSize: '13px',
      margin: '6px 0 0 0',
    }
  }>
    {children}
  </p>
)