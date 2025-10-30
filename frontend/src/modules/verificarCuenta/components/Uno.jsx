import React, { useState } from "react";
import { MiniFormsTemplate } from "../../formulario/components/plantilla/MiniFormsTemplate";
import { DocumentacionLegal } from "../../formulario/components/organismos/DocumentacionLegal";
import { DocumentosRepresentanteLegal } from "../../formulario/components/organismos/DocumentosRepresentanteLegal";
import styles from "./FormSections.module.css";

export const Uno = () => {
  const [formData, setFormData] = useState({
    // Documentación Legal
    contratoEstatuto: null,          // estatutoSocial
    actaDesignacion: null,           // actaDesignacionAutoridades
    poderRepresentante: null,        // poderRepresentante
    constanciaFiscal: null,          // inscripcionFiscal
    comprobanteDomicilio: null,      // comprobanteDomicilioFiscal
    certificadoMipyme: null,         // certificadoPyMes
    // Documentos Representante Legal
    dniRepresentante: null,          // DNI
    domicilioRepresentante: null,    // comprobanteDomicilioPersonal
    declaracionBeneficiario: null,   // DeclaracionJurada
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isDocuLegal, setIsDocuLegal] = useState(true);

  // 🔁 Cambiar entre Documentación Legal y Representante Legal
  const handleDocuLegalToggle = () => {
    setIsDocuLegal(!isDocuLegal);
  };

  // ✅ Subir los PDFs al backend
  const uploadDocuments = async () => {
    const token = localStorage.getItem("token");
    const form = new FormData();

    // 🔗 Mapear claves locales -> claves esperadas por el backend
    const mapping = {
      contratoEstatuto: "estatutoSocial",
      actaDesignacion: "actaDesignacionAutoridades",
      poderRepresentante: "poderRepresentante",
      constanciaFiscal: "inscripcionFiscal",
      comprobanteDomicilio: "comprobanteDomicilioFiscal",
      certificadoMipyme: "certificadoPyMes",
      declaracionBeneficiario: "DeclaracionJurada",
      dniRepresentante: "DNI",
      domicilioRepresentante: "comprobanteDomicilioPersonal",
    };

    for (const [key, value] of Object.entries(formData)) {
      if (value) {
        form.append(mapping[key], value);
      }
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/validate-account`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("❌ Error al subir archivos:", data);
        alert(data.data?.message || "Error al subir los documentos");
      } else {
        console.log("✅ Documentos subidos:", data);
        alert("Documentos enviados correctamente");
      }
    } catch (error) {
      console.error("❌ Error en la subida:", error);
      alert("Error de conexión con el servidor");
    }
  };

  // ➡️ Botón Continuar
  const handleContinue = async () => {
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

    // Enviar archivos
    setIsSaving(true);
    await uploadDocuments();
    setIsSaving(false);
  };

  const handleBack = () => {
      handleDocuLegalToggle();
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
