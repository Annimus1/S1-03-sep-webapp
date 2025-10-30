import React, { useState } from "react";
import { MiniFormsTemplate } from "../plantilla/MiniFormsTemplate";
import { InformacionOperativaNegocioUNO } from "../organismos/InformacionOperativaNegocioUNO";
import { InformacionOperativaNegocioDOS } from "../organismos/InformacionOperativaNegocioDOS";
import styles from "./FormSections.module.css";
import axios from "axios";

export const Tres = ({ setPasoActual }) => {
  const [formData, setFormData] = useState({
    // ✅ Parte 1
    descripcionNegocio: "", // es texto, no archivo
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

  const API_URL = import.meta.env.VITE_API_URL;
  const creditInfo = JSON.parse(localStorage.getItem("creditInfo"));
  const creditId = creditInfo?.credit?._id;
  const userId = creditInfo?.credit?.userId;
  const creditType = creditInfo?.credit?.creditType;

  // 🔁 Cambiar entre Parte 1 y Parte 2
  const handleParteToggle = () => {
    setIsPrimeraParte(!isPrimeraParte);
  };

  // ⬅️ Botón Atrás
  const handleBack = () => {
    if (isPrimeraParte) {
      setPasoActual(3);
    } else {
      handleParteToggle();
    }
  };

  // ✅ Subir archivos al backend
  const handleContinue = async () => {
    if (isPrimeraParte) {
      handleParteToggle();
      return;
    }

    // Validar campos obligatorios
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
      return;
    }

    if (!creditId) {
      return;
    }

    // Construir el FormData
    const data = new FormData();
    data.append("userId", userId);
    data.append("creditType", creditType);
    data.append("estatus", "documentacion_operativa");
    data.append("datosVerificados", false);

    // 🔹 Mapear campos de frontend → backend
    const fileMap = {
      principalesClientes: "principalesClientes",
      principalesProveedores: "principalesProveedores",
      contratosComerciales: "contratosComerciales",
      organigrama: "organigramaPersonal",
      facturacionReciente: "comprobanteFacturacion",
      certificadosPermisos: "permisosHabilitantes",
      comprobantePropiedad: "comprobantePropiedad",
      fotosEstablecimiento: "fotosEstablecimiento",
      evidenciaOnline: "evidenciaActividadOnline",
      descripcionMercado: "descripcionMercado",
    };

    // Descripción general del negocio (texto)
    if (formData.descripcionNegocio) {
      data.append("descripcionNegocio", formData.descripcionNegocio);
    }

    // Archivos reales
    Object.entries(fileMap).forEach(([frontendKey, backendKey]) => {
      if (formData[frontendKey]) {
        data.append(backendKey, formData[frontendKey]);
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

      // Actualizar creditInfo en localStorage
      const updatedCredit = response.data?.data?.credit;
      localStorage.setItem(
        "creditInfo",
        JSON.stringify({
          ...creditInfo,
          credit: updatedCredit,
          PasoActual: 4,
        })
      );

      setPasoActual(4);
    } catch (error) {
      console.error("❌ Error al subir archivos:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <MiniFormsTemplate
      onBack={handleBack}
      onContinue={handleContinue}
      isSaving={isSaving}
      text="Sube la documentación operativa requerida para completar la evaluación de tu crédito"
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
