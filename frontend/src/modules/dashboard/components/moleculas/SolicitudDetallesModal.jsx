import { useState, useEffect } from "react";
import styles from "./SolicitudDetallesModal.module.css";
import axios from "axios";

export const SolicitudDetallesModal = ({ 
  solicitud, 
  onClose, 
  onSubirDocumentos 
}) => {
  const [isUploadDisabled, setIsUploadDisabled] = useState(false);
  const [isDownloadEnabled, setIsDownloadEnabled] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    try {
      const creditInfo = localStorage.getItem('creditInfo');
      if (creditInfo) {
        const parsedInfo = JSON.parse(creditInfo);
        const pasoActual = parsedInfo.PasoActual;
        
        // Deshabilitar subir documentos si PasoActual es mayor que 6
        if (pasoActual > 6) {
          setIsUploadDisabled(true);
          setIsDownloadEnabled(true); // Habilitar descarga
        }
      }
    } catch (error) {
      console.error('Error al leer creditInfo del localStorage:', error);
    }
  }, []);

  const downloadFile = async (fileName) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/uploads/${fileName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });

      const pdfBlob = res.data;
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("❌ Error al descargar el archivo:", error);
    }
  };

  const handleDescargarContrato = async () => {
    if (!isDownloadEnabled) return;

    try {
      setIsDownloading(true);
      
      const creditInfo = JSON.parse(localStorage.getItem("creditInfo"));
      const creditId = creditInfo?.credit?._id;
      const token = localStorage.getItem("token");

      if (!creditId) {
        setIsDownloading(false);
        return;
      }

      // Obtener datos actualizados del crédito
      const datacredit = await axios.get(`${API_URL}/credit/${creditId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "json",
      });

      const firmaDigitalUrl = datacredit.data?.data?.credit?.firmaDigital;

      if (!firmaDigitalUrl) {
        setIsDownloading(false);
        return;
      }

      const fileName = firmaDigitalUrl.split("/").pop();
      await downloadFile(fileName);

    } catch (error) {
      console.error("Error al descargar el contrato:", error);
    } finally {
      setIsDownloading(false);
    }
  };

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
            <span className={styles.label}>Contacto</span>
            <span className={styles.value}>{solicitud.contacto}</span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.label}>Fecha</span>
            <span className={styles.value}>{solicitud.fecha}</span>
          </div>

          {/* Notificación */}
          {/* {solicitud.notificacion && (
            <div className={styles.detailRow}>
              <span className={styles.label}>Notificación</span>
              <span className={styles.notification}>
                {solicitud.notificacion}
              </span>
            </div>
          )} */}
        </div>

        {/* Botones de acción */}
        <div className={styles.actions}>
          <button 
            className={`${styles.uploadButton} ${isUploadDisabled ? styles.disabled : ''}`}
            onClick={isUploadDisabled ? null : onSubirDocumentos}
            disabled={isUploadDisabled}
          >
            Subir nuevos documentos
          </button>
          <button 
            className={`${styles.contractButton} ${!isDownloadEnabled ? styles.disabled : ''}`}
            onClick={handleDescargarContrato}
            disabled={!isDownloadEnabled || isDownloading}
          >
            {isDownloading ? "Descargando..." : "Descargar contrato"}
          </button>
        </div>
      </div>
    </div>
  );
};