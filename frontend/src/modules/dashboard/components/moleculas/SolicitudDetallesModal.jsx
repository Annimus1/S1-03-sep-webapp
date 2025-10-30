import React from "react";
import styles from "./SolicitudDetallesModal.module.css";

export const SolicitudDetallesModal = ({ 
  solicitud, 
  onClose, 
  onSubirDocumentos, 
  onVerContrato 
}) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Detalles de tu solicitud</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path 
                d="M18 6L6 18M6 6l12 12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Detalles */}
        <div className={styles.details}>
          <div className={styles.detailRow}>
            <span className={styles.label}>Nombre de la empresa</span>
            <span className={styles.value}>{solicitud.nombreEmpresa}</span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.label}>CUIT</span>
            <span className={styles.value}>{solicitud.cuit}</span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.label}>Propósito de la solicitud</span>
            <span className={styles.value}>{solicitud.proposito}</span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.label}>Contacto</span>
            <span className={styles.value}>{solicitud.contacto}</span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.label}>Fecha</span>
            <span className={styles.value}>{solicitud.fecha}</span>
          </div>

          {/* Notificación */}
          {solicitud.notificacion && (
            <div className={styles.detailRow}>
              <span className={styles.label}>Notificación</span>
              <span className={styles.notification}>
                {solicitud.notificacion}
              </span>
            </div>
          )}
        </div>

        {/* Botones de acción */}
        <div className={styles.actions}>
          <button 
            className={styles.uploadButton}
            onClick={onSubirDocumentos}
          >
            Subir nuevos documentos
          </button>
          <button 
            className={styles.contractButton}
            onClick={onVerContrato}
          >
            Ver mi contrato
          </button>
        </div>
      </div>
    </div>
  );
};