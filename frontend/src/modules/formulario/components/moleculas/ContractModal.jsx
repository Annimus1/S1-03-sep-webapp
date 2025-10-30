import React, { useEffect } from "react";
import styles from "./ContractModal.module.css";

export const ContractModal = ({ contratoHTML, onClose }) => {
  useEffect(() => {
    // Bloquear scroll del body cuando el modal está abierto
    document.body.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>

        <div className={styles.contractScroll}>
          <div 
            className={styles.contractText}
            dangerouslySetInnerHTML={{ __html: contratoHTML }} 
          />
        </div>
      </div>
    </div>
  );
};