import { BotonAnimado } from "../../../../globals/components/atomos/BotonAnimado";
import { BackButton } from "../atomos/BackButton";
import styles from "./MiniFormsTemplate.module.css";

export const MiniFormsTemplate = ({
  children,
  onBack,
  onContinue,
  showContinue = true,
  isSaving = false,
  text,
  continueButtonText = "Continuar", // 👈 Nuevo prop
  showFooterNote = true, // 👈 Nuevo prop para ocultar el mensaje de PDF
}) => {
  return (
    <div className={styles.registrationTemplate}>
      <div className={styles.templateHeader}>
        <BackButton onClick={onBack} />
        <p className={styles.headerText}>{text}</p>
      </div>

      <div className={styles.templateContentWrapper}>
        <div className={styles.templateContent}>
          <div className={styles.contentInner}>
            {children}

            {showFooterNote && (
              <div className={styles.contentFooter}>
                <div className={styles.footerNote}>
                  <span className={styles.requiredAsterisk}>*</span> Obligatorio
                  <br />
                  <span className={styles.formatNote}>
                    ¡Formato PDF para todos los documentos!
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {showContinue && (
          <div className={styles.floatingButtonContainer}>
            <BotonAnimado variante="naranja" onClick={onContinue}>
              {continueButtonText} {/* 👈 Usar el texto personalizado */}
            </BotonAnimado>
          </div>
        )}

        {isSaving && (
          <div className={styles.savingIndicator}>Guardando tu proceso...</div>
        )}
      </div>
    </div>
  );
};