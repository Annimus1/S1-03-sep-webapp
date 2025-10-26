import React, { useState } from "react";
import { MiniFormsTemplate } from "../plantilla/MiniFormsTemplate";
import { InformacionCrediticiaUNO } from "../organismos/InformacionCrediticiaUNO";
import { InformacionCrediticiaDOS } from "../organismos/InformacionCrediticiaDOS";
import { InformacionCrediticiaTRES } from "../organismos/InformacionCrediticiaTRES";
import styles from "./FormSections.module.css";

export const Cinco = ({ setPasoActual }) => {
  const [formData, setFormData] = useState({
    // Parte 1: Información Crediticia y Bancaria
    constanciaCBU: null,
    informeCrediticio: null,
    certificadoLibreDeuda: null,
    detalleCreditos: null,
    historialPrestamos: null,
    referenciasBancarias: null,
    referenciasComerciales: null,
    declaracionConcurso: null,

    // Parte 2: Garantías
    tituloPropiedad: null,
    informeRegistral: null,
    tasacionBien: null,
    seguroBien: null,
    avalSolidario: null,
    declaracionPatrimonial: null,
    comprobantesGarante: null,
    pagareDeuda: null,
    cesionDerechos: null,

    // Parte 3: Documentación Regulatoria
    declaracionOrigenFondos: null,
    consentimientoAnalisis: null,
    declaracionBeneficiarios: null,
    politicasCumplimiento: null,
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [parteActual, setParteActual] = useState(1); // 1, 2 o 3

  const handleBack = () => {
    if (parteActual === 1) {
      setPasoActual(3); // vuelve al paso anterior del wizard principal
    } else {
      setParteActual(parteActual - 1);
    }
  };

  const handleContinue = () => {
    // Si no estamos en la última parte, avanzar a la siguiente
    if (parteActual < 3) {
      setParteActual(parteActual + 1);
      return;
    }

    // Validar todos los campos obligatorios de las 3 partes
    const requiredFields = [
      // Parte 1
      "constanciaCBU",
      "informeCrediticio",
      "certificadoLibreDeuda",
      "detalleCreditos",
      "historialPrestamos",
      "referenciasBancarias",
      "referenciasComerciales",
      "declaracionConcurso",
      // Parte 2
      "tituloPropiedad",
      "informeRegistral",
      "tasacionBien",
      "seguroBien",
      "avalSolidario",
      "declaracionPatrimonial",
      "comprobantesGarante",
      "pagareDeuda",
      "cesionDerechos",
      // Parte 3
      "declaracionOrigenFondos",
      "consentimientoAnalisis",
      "declaracionBeneficiarios",
      "politicasCumplimiento",
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

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      console.log("Información crediticia enviada:", formData);
      alert("Información enviada correctamente ✅");
      setPasoActual(5); // avanza al siguiente paso del wizard principal
    }, 1500);
  };

  return (
    <MiniFormsTemplate
      onBack={handleBack}
      onContinue={handleContinue}
      isSaving={isSaving}
      text="Proporciona la información crediticia, garantías y documentación regulatoria necesaria para evaluar tu solicitud."
    >
      <div className={styles.unifiedContent}>
        {parteActual === 1 && (
          <InformacionCrediticiaUNO
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        )}
        
        {parteActual === 2 && (
          <InformacionCrediticiaDOS
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        )}
        
        {parteActual === 3 && (
          <InformacionCrediticiaTRES
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