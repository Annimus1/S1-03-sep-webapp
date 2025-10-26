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
    
    setTimeout(() => {
      alert("¡Contrato firmado exitosamente! ✅");
      onComplete();
    }, 1000);
  };

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

      {/* Sección de firma - CON POSITION RELATIVE */}
      <div className={styles.signatureSectionWrapper}>
        {/* Mensaje de error - POSITION ABSOLUTE FLOTANDO */}
        {showError && (
          <div className={styles.errorMessage}>
            <div>
              <strong>No se puede continuar</strong>
              <p>Para continuar, debes aceptar los Términos & Condiciones y autorizar tu firma digital.</p>
            </div>
            <button className={styles.closeButton} onClick={() => setShowError(false)}>×</button>
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