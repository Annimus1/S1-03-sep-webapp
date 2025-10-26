import React, { useState } from "react";
import { MiniFormsTemplate } from "../plantilla/MiniFormsTemplate";
import { TipoCredito } from "../organismos/TipoCredito";
import styles from "./FormSections.module.css";

export const Cuatro = ({ setPasoActual }) => {
  const [tipoCredito, setTipoCredito] = useState("inversion");
  
  const [formData, setFormData] = useState({
    // Crédito de Inversión
    presupuestoInversion: null,
    cotizacionesProveedores: null,
    planImplementacion: null,
    estudioFactibilidad: null,
    licenciasObra: null,
    planMantenimiento: null,
    facturaProforma: null,
    informeTecnico: null,
    
    // Capital de Trabajo
    detalleUsoFondos: null,
    proyeccionFlujo: null,
    listadoGastos: null,
    facturasProforma: null,
    evidenciaAumento: null,
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const handleBack = () => {
    setPasoActual(2); // vuelve al paso anterior
  };

  const handleContinue = () => {
    // Validar campos según tipo de crédito seleccionado
    const requiredFields = tipoCredito === "inversion" 
      ? [
          "presupuestoInversion",
          "cotizacionesProveedores",
          "planImplementacion",
          "estudioFactibilidad",
          "licenciasObra",
          "planMantenimiento",
          "facturaProforma",
          "informeTecnico",
        ]
      : [
          "detalleUsoFondos",
          "proyeccionFlujo",
          "listadoGastos",
          "facturasProforma",
          "evidenciaAumento",
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
      console.log("Tipo de crédito:", tipoCredito);
      console.log("Documentación enviada:", formData);
      alert("Información enviada correctamente ✅");
      setPasoActual(4);
    }, 1500);
  };

  return (
    <MiniFormsTemplate
      onBack={handleBack}
      onContinue={handleContinue}
      isSaving={isSaving}
      text="Selecciona el tipo de crédito y adjunta la documentación específica requerida."
    >
      <div className={styles.unifiedContent}>
        <TipoCredito
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
          tipoCredito={tipoCredito}
          setTipoCredito={setTipoCredito}
        />
      </div>
    </MiniFormsTemplate>
  );
};