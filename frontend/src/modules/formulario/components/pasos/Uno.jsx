import React, { useState } from "react";
import { MiniFormsTemplate } from "../plantilla/MiniFormsTemplate";
import { DocumentacionLegal } from "../organismos/DocumentacionLegal";
import { DocumentosRepresentanteLegal } from "../organismos/DocumentosRepresentanteLegal";
import styles from "./FormSections.module.css";

export const Uno = ({ setPasoActual }) => {
  const [formData, setFormData] = useState({
    // Documentación Legal
    contratoEstatuto: null,
    actaDesignacion: null,
    poderRepresentante: null,
    constanciaFiscal: null,
    comprobanteDomicilio: null,
    certificadoMipyme: null,
    // Documentos Representante Legal
    dniRepresentante: null,
    domicilioRepresentante: null,
    declaracionBeneficiario: null,
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isDocuLegal, setIsDocuLegal] = useState(true);

  // ⬅️ Botón Atrás
  const handleBack = () => {
    if (isDocuLegal) {
      setPasoActual(0); // Regresa al paso anterior (solicitud de crédito)
    } else {
      handleDocuLegalToggle(); // Vuelve a documentación legal
    }
  };

  // 🔁 Cambiar entre Documentación Legal y Representante Legal
  const handleDocuLegalToggle = () => {
    setIsDocuLegal(!isDocuLegal);
  };

  // ➡️ Botón Continuar
  const handleContinue = () => {
    if (isDocuLegal) {
      handleDocuLegalToggle();
      return;
    }

    // Validar campos requeridos
    const requiredFields = [
      "contratoEstatuto",
      "actaDesignacion",
      "constanciaFiscal",
      "comprobanteDomicilio",
      "dniRepresentante",
      "domicilioRepresentante",
      "declaracionBeneficiario",
    ];

    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "Este campo es obligatorio";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    // Simular guardado
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      console.log("Formulario enviado:", formData);
      alert("Documentos enviados correctamente");
      setPasoActual(2);
    }, 1500);
  };

  return (
    <MiniFormsTemplate
      onBack={handleBack}
      onContinue={handleContinue}
      isSaving={isSaving}
      text="Sube los documentos requeridos para verificar tu cuenta y proceder con la solicitud de tu crédito"
    >
      <div className={styles.unifiedContent}>
        {isDocuLegal ? (
          <DocumentacionLegal
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        ) : (
          <DocumentosRepresentanteLegal
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        )}
      </div>
    </MiniFormsTemplate>
  );
};
