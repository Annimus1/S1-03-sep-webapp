import React, { useState } from "react";
import { MiniFormsTemplate } from "../plantilla/MiniFormsTemplate";
import { InformacionOperativaNegocioUNO } from "../organismos/InformacionOperativaNegocioUNO";
import { InformacionOperativaNegocioDOS } from "../organismos/InformacionOperativaNegocioDOS";
import styles from "./FormSections.module.css";

export const Tres = ({ setPasoActual }) => {
  const [formData, setFormData] = useState({
    // ✅ Parte 1
    descripcionNegocio: null,
    principalesClientes: null,
    principalesProveedores: null,
    contratosComerciales: null,
    organigrama: null,
    facturacionReciente: null,

    // ✅ Parte 2
    certificadosPermisos: null,
    comprobantePropiedad: null,
    fotosEstablecimiento: null,
    evidenciaOnline: null,
    descripcionMercado: null,
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isPrimeraParte, setIsPrimeraParte] = useState(true);

  // ⬅️ Botón Atrás
  const handleBack = () => {
    if (isPrimeraParte) {
      setPasoActual(2); // vuelve al paso financiero
    } else {
      handleParteToggle();
    }
  };

  // 🔁 Cambiar entre Parte 1 y Parte 2
  const handleParteToggle = () => {
    setIsPrimeraParte(!isPrimeraParte);
  };

  // ✅ Botón Continuar
  const handleContinue = () => {
    if (isPrimeraParte) {
      handleParteToggle();
      return;
    }

    // ✅ Campos obligatorios según el diseño
    const requiredFields = [
      "descripcionNegocio",
      "principalesClientes",
      "principalesProveedores",
      "facturacionReciente",
      "certificadosPermisos",
      "comprobantePropiedad",
      "fotosEstablecimiento",
      "evidenciaOnline",
      "descripcionMercado",
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
      console.log("Información operativa enviada:", formData);
      alert("Información enviada correctamente ✅");

      // 👉 Avanzar al siguiente paso del wizard
      setPasoActual(4);
    }, 1500);
  };

  return (
    <MiniFormsTemplate
      onBack={handleBack}
      onContinue={handleContinue}
      isSaving={isSaving}
      text="Cuéntanos cómo opera tu empresa día a día. Esta información nos ayuda a entender mejor tu modelo de negocio."
    >
      <div className={styles.unifiedContent}>
        {isPrimeraParte ? (
          <InformacionOperativaNegocioUNO
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        ) : (
          <InformacionOperativaNegocioDOS
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
