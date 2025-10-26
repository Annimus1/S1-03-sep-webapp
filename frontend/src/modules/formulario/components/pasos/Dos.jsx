import React, { useState } from "react";
import { MiniFormsTemplate } from "../plantilla/MiniFormsTemplate";
import { InformacionFinancieraUNO } from "../organismos/InformacionFinancieraUNO";
import { InformacionFinancieraDOS } from "../organismos/InformacionFinancieraDOS";
import styles from "./FormSections.module.css";

export const Dos = ({ setPasoActual }) => {
  const [formData, setFormData] = useState({
    // Parte 1
    estadosAuditados: null,
    estadosIntermedios: null,
    declaracionesImpositivas: null,
    comprobantesImpuestos: null,
    resumenCuentas: null,
    detalleIngresosEgresos: null,
    cuentasPorCobrarPagar: null,
    inventariosValuaciones: null,
    // Parte 2
    detalleActivosFijos: null,
    registroVentasCompras: null,
    proyeccionFlujoFondos: null,
    planFinancieroCredito: null,
    ratiosFinancieros: null,
    certificacionContable: null,
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isPrimeraParte, setIsPrimeraParte] = useState(true);

  // ⬅️ Botón Atrás
  const handleBack = () => {
    if (isPrimeraParte) {
      setPasoActual(1); // vuelve al paso anterior
    } else {
      handleParteToggle();
    }
  };

  // 🔁 Cambiar entre Parte 1 y Parte 2
  const handleParteToggle = () => {
    setIsPrimeraParte(!isPrimeraParte);
  };

  // ➡️ Botón Continuar
  const handleContinue = () => {
    if (isPrimeraParte) {
      handleParteToggle();
      return;
    }

    // Validar campos obligatorios
    const requiredFields = [
      "declaracionesImpositivas",
      "comprobantesImpuestos",
      "detalleIngresosEgresos",
      "cuentasPorCobrarPagar",
      "registroVentasCompras",
      "proyeccionFlujoFondos",
      "planFinancieroCredito",
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
      console.log("Formulario financiero enviado:", formData);
      alert("Información financiera enviada correctamente");
      // 👉 Puedes avanzar al siguiente paso si lo deseas:
      // setPasoActual(3);
    }, 1500);
  };

  return (
    <MiniFormsTemplate
      onBack={handleBack}
      onContinue={handleContinue}
      isSaving={isSaving}
      text="Sube la documentación financiera y contable requerida para completar la evaluación de tu crédito"
    >
      <div className={styles.unifiedContent}>
        {isPrimeraParte ? (
          <InformacionFinancieraUNO
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        ) : (
          <InformacionFinancieraDOS
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
