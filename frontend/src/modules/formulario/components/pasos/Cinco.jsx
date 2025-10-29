import React, { useState } from "react";
import axios from "axios";
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

  const API_URL = import.meta.env.VITE_API_URL;
  const creditInfo = JSON.parse(localStorage.getItem("creditInfo"));
  const creditId = creditInfo?.credit?._id;
  const userId = creditInfo?.credit?.userId;
  const creditType = creditInfo?.credit?.creditType;

  // ⬅️ Botón Atrás
  const handleBack = () => {
    if (parteActual === 1) {
      setPasoActual(4);
    } else {
      setParteActual(parteActual - 1);
    }
  };

  // ✅ Botón Continuar
  const handleContinue = async () => {
    // Si no estamos en la última parte, avanzar
    if (parteActual < 3) {
      setParteActual(parteActual + 1);
      return;
    }

    // Validar campos obligatorios
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

    if (!creditId) {
      alert("No se encontró el ID del crédito en localStorage");
      return;
    }

    // 🧱 Construir el FormData
    const data = new FormData();
    data.append("userId", userId);
    data.append("creditType", creditType);
    data.append("estatus", "evaluacion_crediticia");
    data.append("datosVerificados", false);

    // 🔹 Mapear campos de frontend → backend
    const fileMap = {
      // Parte 1
      constanciaCBU: "constanciaCBU",
      informeCrediticio: "informeCrediticio",
      certificadoLibreDeuda: "certificadoLibreDeuda",
      detalleCreditos: "detalleCreditos",
      historialPrestamos: "historialPrestamos",
      referenciasBancarias: "referenciasBancarias",
      referenciasComerciales: "referenciasComerciales",
      declaracionConcurso: "ddjjQuiebra",

      // Parte 2
      tituloPropiedad: "tituloPropiedad",
      informeRegistral: "informeRegistral",
      tasacionBien: "tasaOficial",
      seguroBien: "seguro",
      avalSolidario: "avalSolidario",
      declaracionPatrimonial: "declaracionPatrimonialGarante",
      comprobantesGarante: "comprobanteGarantes",
      pagareDeuda: "documentoDeuda",
      cesionDerechos: "cesionSGR",

      // Parte 3
      declaracionOrigenFondos: "ddjjOrigenLicito",
      consentimientoAnalisis: "consentimientoAnalisis",
      declaracionBeneficiarios: "ddjjBeneficiarioFinal",
      politicasCumplimiento: "constanciaPoliticasInternas",
    };

    // Agregar archivos al FormData
    Object.keys(fileMap).forEach((field) => {
      const backendKey = fileMap[field];
      if (formData[field]) {
        data.append(backendKey, formData[field]);
      }
    });

    try {
      setIsSaving(true);
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/credit/upload/${creditId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("✅ Respuesta subida:", response.data);

      // Actualizar localStorage
      const updatedCredit = response.data?.data?.credit;
      localStorage.setItem(
        "creditInfo",
        JSON.stringify({
          ...creditInfo,
          credit: updatedCredit,
          PasoActual: 6,
        })
      );

      alert("Información crediticia subida correctamente ✅");
      setPasoActual(6);
    } catch (error) {
      console.error("❌ Error al subir información crediticia:", error);
      alert("Error al subir la información. Verifica tu conexión o los archivos.");
    } finally {
      setIsSaving(false);
    }
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
