import React, { useState } from "react";
import { SignatureCanvas } from "../atomos/SignatureCanvas";
import { ContractModal } from "../moleculas/ContractModal";
import { BotonAnimado } from "../../../../globals/components/atomos/BotonAnimado";
import styles from "./FirmaDigitalView.module.css";
import html2pdf from "html2pdf.js";

export const FirmaDigitalView = ({ contratoHTML, onComplete }) => {
  const [signature, setSignature] = useState(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [authorizedSignature, setAuthorizedSignature] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showContractModal, setShowContractModal] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleDownload = () => {
    const element = document.createElement("div");
    element.innerHTML = contratoHTML;

    if (signature) {
      const signatureContainer = document.createElement("div");
      signatureContainer.style.textAlign = "center";
      signatureContainer.style.marginTop = "40px";

      const label = document.createElement("p");
      label.textContent = "Firma del cliente:";
      label.style.marginBottom = "8px";
      label.style.fontWeight = "bold";

      const img = document.createElement("img");
      img.src = signature;
      img.style.width = "200px";
      img.style.borderTop = "1px solid #000";
      img.style.display = "block";
      img.style.margin = "auto";

      signatureContainer.appendChild(label);
      signatureContainer.appendChild(img);
      element.appendChild(signatureContainer);
    }

    const options = {
      margin: 10,
      filename: "contrato-kredia.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };

  const handleZoomContract = () => {
    setShowContractModal(true);
  };

  const handleSignatureComplete = (signatureData) => {
    setSignature(signatureData);
  };

  const handleSubmit = () => {
    if (!acceptedTerms || !authorizedSignature || !signature) {
      setShowError(true);
      return;
    }

    setShowError(false);
    
    // Simular envío con posibilidad de éxito o error
    setTimeout(() => {
      // Simular 90% éxito, 10% error (puedes cambiar esta lógica)
      const isSuccess = Math.random() > 0.1;
      
      if (isSuccess) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    }, 1000);
  };

  const handleRetry = () => {
    setSubmitStatus(null);
  };

  const handleViewStatus = () => {
    // Aquí puedes navegar a la página de estado
    onComplete();
  };

  // Pantalla de éxito
  if (submitStatus === 'success') {
    return (
      <div className={styles.statusScreen}>
        <div className={styles.statusCard}>
          <div className={styles.successHeader}>
            ¡Firma digital completada con éxito!
          </div>
          
          <div className={styles.statusContent}>
            <p>Tu contrato fue firmado de manera segura.</p>
            <p>En unos segundos podrás revisar el estado actualizado de tu solicitud.</p>
          </div>

          <div className={styles.statusButtons}>
            <BotonAnimado  variante="morado"
              className={styles.secondaryButton}
              onClick={handleDownload}
            >
              Descargar tu contrato firmado
            </BotonAnimado>
            <BotonAnimado  variante="naranja"
              className={styles.primaryButton}
              onClick={handleViewStatus}
            >
              Ver estado de mi solicitud
            </BotonAnimado>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla de error
  if (submitStatus === 'error') {
    return (
      <div className={styles.statusScreen}>
        <div className={styles.statusCard}>
          <div className={styles.errorHeader}>
            No pudimos confirmar tu firma digital
          </div>
          
          <div className={styles.statusContent}>
            <p>Es posible que la sesión en el "espacio seguro Kredia" haya expirado o se haya cancelado.</p>
            <p>Intenta nuevamente o comunícate con nuestro soporte.</p>
          </div>

          <div className={styles.statusButtons}>
            <button 
              className={styles.primaryButton}
              onClick={handleRetry}
            >
              Reintentar firma
            </button>
          </div>

          <div className={styles.supportText}>
            ¿Aún no consigues firmar?{" "}
            <a href="#" className={styles.supportLink}>
              Contacta nuestro Soporte
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla principal de firma
  return (
    <div className={styles.firmaView}>
      {/* Sección del contrato */}
      <div className={styles.backgroundOverlay}>
        <div className={styles.header}>
          <button className={styles.downloadButton} onClick={handleDownload}>
            Descargar tu contrato
          </button>
          <h2 className={styles.title}>Firma Digital</h2>
        </div>

        <div className={styles.contractViewer}>
          <button className={styles.zoomButton} onClick={handleZoomContract}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
              <path d="M11 8v6M8 11h6" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>

          <div 
            className={styles.contractContent}
            dangerouslySetInnerHTML={{ __html: contratoHTML.substring(0, 1000) + "..." }}
          />
        </div>
      </div>

      {/* Sección de firma */}
      <div className={styles.signatureSectionWrapper}>
        {/* Mensaje de error flotante */}
        {showError && (
          <div className={styles.errorMessage}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              />
            </svg>
            <div>
              <strong>No se puede continuar</strong>
              <p>Para continuar, debes aceptar los Términos & Condiciones y autorizar tu firma digital.</p>
            </div>
            <button onClick={() => setShowError(false)} className={styles.closeButton}>×</button>
          </div>
        )}

        <div className={styles.signatureSection}>
          {/* Título y subtítulo */}
          <div className={styles.signatureHeader}>
            <h3 className={styles.sectionTitle}>
              Firma Digital 
              <span className={styles.sectionSubtitle}>
                Escribe aquí tu firma en la pizarra para validar tu solicitud de forma segura.
              </span>
            </h3>
          </div>

          {/* Grid: Canvas izquierda, Checkboxes derecha */}
          <div className={styles.signatureGrid}>
            {/* Columna izquierda: Canvas */}
            <div className={styles.signatureCanvasWrapper}>
              <SignatureCanvas onSignatureComplete={handleSignatureComplete} />
            </div>

            {/* Columna derecha: Checkboxes */}
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
                  <span className={styles.link} onClick={handleZoomContract}>
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
                  <strong>Autorizo</strong> el uso de mi firma digital para validar 
                  y enviar esta solicitud de crédito.
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Botón de envío */}
      <div className={styles.submitButtonWrapper}>
        <BotonAnimado
          variante="naranja"
          onClick={handleSubmit}
          disabled={!signature || !acceptedTerms || !authorizedSignature}
        >
          Firma digital lista
        </BotonAnimado>
      </div>

      {/* Modal del contrato */}
      {showContractModal && (
        <ContractModal
          contratoHTML={contratoHTML}
          onClose={() => setShowContractModal(false)}
        />
      )}
    </div>
  );
};