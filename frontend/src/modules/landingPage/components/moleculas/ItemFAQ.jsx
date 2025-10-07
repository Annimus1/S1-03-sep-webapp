import { IconoFAQ } from "../atomos/IconoFAQ";

/**
 * Elemento de pregunta frecuente expandible
 * @param {string} pregunta - Texto de la pregunta
 */
export const ItemFAQ = ({ pregunta }) => (
  <div style={{
    backgroundColor: '#D1C4E9',
    borderRadius: 15,
    padding: '18px 20px',
    marginBottom: 12,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer'
  }}>
    <span style={{ color: '#1a3a3a', fontWeight: 500, fontSize: '14px', paddingRight: '15px' }}>{pregunta}</span>
    <IconoFAQ />
  </div>
);