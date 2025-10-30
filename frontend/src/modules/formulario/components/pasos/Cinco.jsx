import React, { useState } from "react";
import axios from "axios";
import { MiniFormsTemplate } from "../plantilla/MiniFormsTemplate";
import { InformacionCrediticiaUNO } from "../organismos/InformacionCrediticiaUNO";
import { InformacionCrediticiaDOS } from "../organismos/InformacionCrediticiaDOS";
import { InformacionCrediticiaTRES } from "../organismos/InformacionCrediticiaTRES";
import styles from "./FormSections.module.css";

export const Cinco = ({ setPasoActual }) => {
  const [formData, setFormData] = useState({
    // Parte 1
    constanciaCBU: null,
    certificadoLibreDeuda: null,
    historialPrestamos: null,
    referenciasComerciales: null,
    informeCrediticio: null,
    detalleCreditos: null,
    referenciasBancarias: null,
    ddjjQuiebra: null,

    // Parte 2
    tituloPropiedad: null,
    tasaOficial: null,
    avalSolidario: null,
    comprobanteGarantes: null,
    cesionSGR: null,
    informeRegistral: null,
    seguro: null,
    declaracionPatrimonialGarante: null,
    documentoDeuda: null,

    // Parte 3
    ddjjOrigenLicito: null,
    ddjjBeneficiarioFinal: null,
    consentimientoAnalisis: null,
    constanciaPoliticasInternas: null,
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
      setPasoActual(5);
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
      "certificadoLibreDeuda",
      "historialPrestamos",
      "referenciasComerciales",
      "informeCrediticio",
      "detalleCreditos",
      "referenciasBancarias",
      "ddjjQuiebra",

      // Parte 2
      "tituloPropiedad",
      "tasaOficial",
      "avalSolidario",
      "comprobanteGarantes",
      "cesionSGR",
      "informeRegistral",
      "seguro",
      "declaracionPatrimonialGarante",
      "documentoDeuda",

      // Parte 3
      "ddjjOrigenLicito",
      "ddjjBeneficiarioFinal",
      "consentimientoAnalisis",
      "constanciaPoliticasInternas",
    ];

    console.log("1");

    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "Este campo es obligatorio";
      }
    });


    console.log("2");

    console.log("Campos vacíos:", Object.keys(newErrors));
    console.log("formData:", formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("3");

    if (!creditId) {
      return;
    }

    console.log("4");

    // 🧱 Construir el FormData
    const data = new FormData();
    data.append("userId", userId);
    data.append("creditType", creditType);
    data.append("estatus", "evaluacion_crediticia");
    data.append("datosVerificados", false);

    console.log("5");

    // 🔹 Mapear campos de frontend → backend
    const fileMap = {
      // Parte 1
      constanciaCBU: "constanciaCBU",
      certificadoLibreDeuda: "certificadoLibreDeuda",
      historialPrestamos: "historialPrestamos",
      referenciasComerciales: "referenciasComerciales",
      informeCrediticio: "informeCrediticio",
      detalleCreditos: "detalleCreditos",
      referenciasBancarias: "referenciasBancarias",
      ddjjQuiebra: "ddjjQuiebra",

      // Parte 2
      tituloPropiedad: "tituloPropiedad",
      tasaOficial: "tasaOficial",
      avalSolidario: "avalSolidario",
      comprobanteGarantes: "comprobanteGarantes",
      cesionSGR: "cesionSGR",
      informeRegistral: "informeRegistral",
      seguro: "seguro",
      declaracionPatrimonialGarante: "declaracionPatrimonialGarante",
      documentoDeuda: "documentoDeuda",

      // Parte 3
      ddjjOrigenLicito: "ddjjOrigenLicito",
      ddjjBeneficiarioFinal: "ddjjBeneficiarioFinal",
      consentimientoAnalisis: "consentimientoAnalisis",
      constanciaPoliticasInternas: "constanciaPoliticasInternas",
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

      setPasoActual(6);
    } catch (error) {
      console.error("❌ Error al subir información crediticia:", error);
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
