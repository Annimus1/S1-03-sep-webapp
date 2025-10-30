import React, { useState } from "react";
import styles from "./SolicitudDetallesModal.module.css";
import axios from "axios";

export const SolicitudDetallesModalASESOR = ({ 
  solicitud, 
  onClose, 
  onSubirDocumentos 
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;


  const handleDisponible = () => {
    return solicitud.estado == "revision";
  }

  const downloadFile = async (fileName) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/uploads/${fileName}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });

      const pdfBlob = res.data;
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(url);

      console.log("✅ Archivo descargado correctamente");
    } catch (error) {
      console.error("❌ Error al descargar el archivo:", error);
    }
  };

  const handleDescargarContrato = async () => {
    try {
      setIsDownloading(true);
      const creditInfo = JSON.parse(localStorage.getItem("creditInfo"));
      const creditId = creditInfo?.credit?._id;
      const token = localStorage.getItem("token");

      if (!creditId) return;

      const datacredit = await axios.get(`${API_URL}/credit/${creditId}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "json",
      });

      const firmaDigitalUrl = datacredit.data?.data?.credit?.firmaDigital;
      if (!firmaDigitalUrl) return;

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
          <h2 className={styles.title}>Detalles de la solicitud</h2>
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
            <span className={styles.label}>Nombre del solicitante</span>
            <span className={styles.value}>{solicitud.nombre}</span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.label}>ID DEL CREDITO</span>
            <span className={styles.value}>{solicitud.id}</span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.label}>Monto del Credito</span>
            <span className={styles.value}>{solicitud.cantidad}</span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.label}>Estado</span>
            <span className={styles.value}>{solicitud.estado}</span>
          </div>
        </div>

        {/* Botones siempre activos */}
        <div className={styles.actions}>
          <button 
            className={
              handleDisponible() ? styles.aprobadoButon : styles.disabled
            }
            onClick={onSubirDocumentos}
            disabled={!handleDisponible()}
          >
            Aprobado
          </button>

          <button 
            className={
              handleDisponible() ? styles.rechazadoButon : styles.disabled
            }
            disabled={!handleDisponible()}
            onClick={handleDescargarContrato}
          >
            Rechazado
          </button>
        </div>
      </div>
    </div>
  );
};
