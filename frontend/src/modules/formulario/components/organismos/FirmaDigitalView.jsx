import React, { useState, useEffect } from "react";
import { SignatureCanvas } from "../atomos/SignatureCanvas";
import { BotonAnimado } from "../../../../globals/components/atomos/BotonAnimado";
import styles from "./FirmaDigitalView.module.css";
import axios from "axios";

const resizeImageBlob = (blob, targetWidth, targetHeight) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(blob);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext("2d");

      if (ctx.imageSmoothingEnabled) {
        ctx.imageSmoothingQuality = "high";
      }

      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      URL.revokeObjectURL(img.src);

      canvas.toBlob((resizedBlob) => {
        if (resizedBlob) {
          resolve(resizedBlob);
        } else {
          reject(new Error("No se pudo crear el blob redimensionado."));
        }
      }, "image/png", 1);
    };

    img.onerror = (error) => {
      URL.revokeObjectURL(img.src);
      reject(error);
    };
  });
};

const downloadFile = async (fileName) => {
  const API_URL = import.meta.env.VITE_API_URL;
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

    console.log("✅ Archivo descargado correctamente");
  } catch (error) {
    console.error("❌ Error al descargar el archivo:", error);
  }
};

export const FirmaDigitalView = ({ onComplete, setPasoActual }) => {
  const [signature, setSignature] = useState(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [authorizedSignature, setAuthorizedSignature] = useState(false);
  const [showError, setShowError] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pdfURL, setPdfURL] = useState(null); // Para visualizar PDF
  const [loadingPDF, setLoadingPDF] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  // Cargar el PDF del contrato al montar el componente
  useEffect(() => {
    const loadContractPDF = async () => {
      try {
        const creditInfo = JSON.parse(localStorage.getItem("creditInfo"));
        const creditId = creditInfo?.credit?._id;
        const token = localStorage.getItem("token");

        if (!creditId) {
          console.error("No se encontró el ID del crédito");
          setLoadingPDF(false);
          return;
        }

        const response = await axios.get(
          `${API_URL}/signature/contract/${creditId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: "blob",
          }
        );

        const blob = new Blob([response.data], { type: "application/pdf" });
        const fileURL = window.URL.createObjectURL(blob);
        setPdfURL(fileURL);
      } catch (error) {
        console.error("Error al cargar el PDF del contrato:", error);
      } finally {
        setLoadingPDF(false);
      }
    };

    loadContractPDF();

    // Cleanup: revocar URL al desmontar
    return () => {
      if (pdfURL) {
        window.URL.revokeObjectURL(pdfURL);
      }
    };
  }, [API_URL]);

  const handleSignatureComplete = (signatureData) => setSignature(signatureData);
  
  const handleVisualizarPDFCompleto = () => {
    if (pdfURL) {
      window.open(pdfURL, "_blank");
    }
  };

  const handleRetry = () => setSubmitStatus(null);
  const handleViewStatus = () => onComplete();

  const handleSubmit = async () => {
    if (!acceptedTerms || !authorizedSignature || !signature) {
      setShowError(true);
      return;
    }

    try {
      setIsSubmitting(true);
      setShowError(false);

      const creditInfo = JSON.parse(localStorage.getItem("creditInfo"));
      const creditId = creditInfo?.credit?._id;
      const token = localStorage.getItem("token");

      if (!creditId) {
        alert("No se encontró el ID del crédito en localStorage.");
        setIsSubmitting(false);
        return;
      }

      // Convertir firma base64 a Blob y redimensionar
      const signatureResponse = await fetch(signature);
      const originalSignatureBlob = await signatureResponse.blob();

      const signatureBlob = await resizeImageBlob(
        originalSignatureBlob,
        200,
        106
      );

      // Obtener contrato PDF desde el backend
      const contratoBlobResponse = await axios.get(
        `${API_URL}/signature/contract/${creditId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/pdf",
          },
          responseType: "blob",
        }
      );

      const contratoBlob = contratoBlobResponse.data;

      // Crear FormData con firma y contrato
      const formData = new FormData();
      formData.append("signature", signatureBlob, "firma.png");
      formData.append("contract", contratoBlob, "contrato.pdf");

      // Enviar al backend
      const res = await axios.post(
        `${API_URL}/signature/sign/${creditId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          responseType: "json",
        }
      );
      
      console.log("✅ Respuesta del POST:", res.data);

      // Obtener datos actualizados del crédito
      const datacredit = await axios.get(`${API_URL}/credit/${creditId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "json",
      });

      const firmaDigitalUrl = datacredit.data?.data?.credit?.firmaDigital;

      if (!firmaDigitalUrl) {
        console.error("No se encontró la URL del archivo firmado en la respuesta.");
        throw new Error("No se encontró la URL del archivo firmado.");
      }

      console.log("✅ URL del archivo firmado:", firmaDigitalUrl);

      const fileName = firmaDigitalUrl.split("/").pop();

      console.log("✅ Nombre del archivo a descargar:", fileName);

      downloadFile(fileName);

      setSubmitStatus("success");
    } catch (error) {
      console.error("Error al enviar la firma y contrato:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🟢 Éxito
  if (submitStatus === "success") {


    const creditInfo = JSON.parse(localStorage.getItem("creditInfo") || "{}");
    creditInfo.PasoActual = 7;
    localStorage.setItem("creditInfo", JSON.stringify(creditInfo));

    setPasoActual(7);

    return (
      <div className={styles.statusScreen}>
        <div className={styles.statusCard}>
          <div className={styles.successHeader}>
            ¡Firma digital completada con éxito!
          </div>
          <div className={styles.statusContent}>
            <p>Tu firma y contrato fueron registrados correctamente.</p>
            <p>En breve podrás revisar el estado de tu solicitud.</p>
          </div>
          <div className={styles.statusButtons}>
            <BotonAnimado
              variante="naranja"
              onClick={handleViewStatus}
            >
              Ver estado de mi solicitud
            </BotonAnimado>
          </div>
        </div>
      </div>
    );
  }

  // 🔴 Error
  if (submitStatus === "error") {
    return (
      <div className={styles.statusScreen}>
        <div className={styles.statusCard}>
          <div className={styles.errorHeader}>
            No pudimos registrar tu firma digital
          </div>
          <div className={styles.statusContent}>
            <p>Es posible que haya expirado tu sesión o haya ocurrido un error.</p>
            <p>Intenta nuevamente o contacta con nuestro soporte.</p>
          </div>
          <div className={styles.statusButtons}>
            <button className={styles.primaryButton} onClick={handleRetry}>
              Reintentar firma
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 🖋 Pantalla principal
  return (
    <div className={styles.firmaView}>
      <div className={styles.backgroundOverlay}>
        <div className={styles.header}>
          <h2 className={styles.title}>Firma Digital</h2>
        </div>

        <div className={styles.contractViewer}>
          <button 
            className={styles.zoomButton} 
            onClick={handleVisualizarPDFCompleto}
            disabled={loadingPDF || !pdfURL}
            title="Ver contrato completo"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" />
              <path d="M11 8v6M8 11h6" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>

          {loadingPDF ? (
            <div className={styles.contractContent}>
              <p>Cargando contrato...</p>
            </div>
          ) : pdfURL ? (
            <iframe
              src={pdfURL}
              title="Vista previa del contrato"
              className={styles.contractContent}
              style={{ 
                width: "100%", 
                height: "400px", 
                border: "none",
                borderRadius: "8px"
              }}
            />
          ) : (
            <div className={styles.contractContent}>
              <p>No se pudo cargar el contrato. Por favor, intenta nuevamente.</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.signatureSectionWrapper}>
        {showError && (
          <div className={styles.errorMessage}>
            <div>
              <strong>No se puede continuar</strong>
              <p>
                Para continuar, debes aceptar los Términos & Condiciones y autorizar tu firma digital.
              </p>
            </div>
            <button onClick={() => setShowError(false)} className={styles.closeButton}>
              ×
            </button>
          </div>
        )}

        <div className={styles.signatureSection}>
          <div className={styles.signatureHeader}>
            <h3 className={styles.sectionTitle}>
              Firma Digital{" "}
              <span className={styles.sectionSubtitle}>
                Escribe aquí tu firma para validar tu solicitud de forma segura.
              </span>
            </h3>
          </div>

          <div className={styles.signatureGrid}>
            <div className={styles.signatureCanvasWrapper}>
              <SignatureCanvas onSignatureComplete={handleSignatureComplete} />
            </div>

            <div className={styles.checkboxesWrapper}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className={styles.checkbox}
                />
                <span>
                  Confirmo que he leído y acepto los{" "}
                  <span 
                    className={styles.link} 
                    onClick={handleVisualizarPDFCompleto}
                    style={{ cursor: pdfURL ? "pointer" : "not-allowed" }}
                  >
                    Términos y Condiciones
                  </span>{" "}
                  de KREDIA.
                </span>
              </label>

              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={authorizedSignature}
                  onChange={(e) => setAuthorizedSignature(e.target.checked)}
                  className={styles.checkbox}
                />
                <span>
                  <strong>Autorizo</strong> el uso de mi firma digital para validar y enviar esta solicitud de crédito.
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.submitButtonWrapper}>
        <BotonAnimado
          variante="naranja"
          onClick={handleSubmit}
          disabled={!signature || !acceptedTerms || !authorizedSignature || isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Firma digital lista"}
        </BotonAnimado>
      </div>
    </div>
  );
};