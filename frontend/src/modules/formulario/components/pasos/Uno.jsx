import React, { useState } from "react";
import { MiniFormsTemplate } from "../plantilla/MiniFormsTemplate";
import { DocumentacionLegal } from "../organismos/DocumentacionLegal";
import { DocumentosRepresentanteLegal } from "../organismos/DocumentosRepresentanteLegal";
import styles from "./FormSections.module.css";

export const Uno = ({ setPasoActual }) => {
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

  // 🔙 Botón Atrás
  const handleBack = () => {
    if (isDocuLegal) {
      setPasoActual(0); // Regresa al paso anterior (solicitud de crédito)
    } else {
      handleDocuLegalToggle(); // Regresa a documentación legal
    }
  };

  // 📤 Subir los PDFs al backend
  const uploadDocuments = async () => {
    const token = localStorage.getItem("token");
    const form = new FormData();

    // Mapeo de claves locales → claves esperadas por el backend
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
        return false;
      } else {
        console.log("✅ Documentos subidos correctamente:", data);
        alert("Documentos enviados correctamente");
        return true;
      }
    } catch (error) {
      console.error("❌ Error en la subida:", error);
      alert("Error de conexión con el servidor");
      return false;
    }
  };

  // 🟢 Botón Continuar
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

    // Subir documentos
    setIsSaving(true);
    const success = await uploadDocuments();
    setIsSaving(false);

    if (success) {
      // ✅ Actualizamos creditInfo localStorage
      const stored = localStorage.getItem("creditInfo");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const updated = { ...parsed, PasoActual: 2 };
          localStorage.setItem("creditInfo", JSON.stringify(updated));
          console.log("📦 Paso actualizado en localStorage:", updated);
        } catch (e) {
          console.error("❌ Error actualizando creditInfo:", e);
        }
      }

      // Cambiar al paso 2 visualmente
      setPasoActual(2);
    }
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
