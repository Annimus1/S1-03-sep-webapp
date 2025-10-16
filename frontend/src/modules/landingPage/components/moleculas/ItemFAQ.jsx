import styles from '../../styles/ItemFAQ.module.css';
import { IconoFAQ } from "../atomos/IconoFAQ";
import { useState } from "react";

/**
 * Elemento de pregunta frecuente expandible
 * @param {string} pregunta - Texto de la pregunta
 * @param {string} respuesta - Texto de la respuesta
 */
export const ItemFAQ = ({ pregunta, respuesta }) => {
  const [estaAbierto, setEstaAbierto] = useState(false);

  return (
    <div
      style={{
        backgroundColor: '#D1C4E9',
        borderRadius: 15,
        marginBottom: 12,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Pregunta */}
      <div
        style={{
          padding: '18px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={() => setEstaAbierto(!estaAbierto)}
      >
        <span
          style={{
            color: '#1a3a3a',
            fontWeight: 500,
            fontSize: '14px',
            paddingRight: '15px',
          }}
        >
          {pregunta}
        </span>
        <IconoFAQ estaAbierto={estaAbierto} />
      </div>

      {/* Respuesta */}
      <div
        className={`${styles.faqRespuesta} ${
          estaAbierto ? styles.abierto : ''
        }`}
      >
        <div
          style={{
            padding: '0 20px 18px 20px',
            color: '#1a3a3a',
            fontSize: '14px',
            lineHeight: 1.6,
          }}
        >
          {respuesta}
        </div>
      </div>
    </div>
  );
};
