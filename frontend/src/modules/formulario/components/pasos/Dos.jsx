import React, { useState } from "react";
import axios from "axios";
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

  const API_URL = import.meta.env.VITE_API_URL; // Asegúrate que esté definido en tu .env
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
      setPasoActual(1);
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
      return;
    }

    if (!creditId) {
      return;
    }

    // Construir el FormData
    const data = new FormData();
    data.append("userId", userId);
    data.append("creditType", creditType);
    data.append("estatus", "documentacion_financiera");
    data.append("datosVerificados", false);

    // 🔹 Mapear campos de frontend → backend
    const fileMap = {
      declaracionesImpositivas: "ddjjImpositivas",
      comprobantesImpuestos: "comprobanteImpuestos",
      detalleIngresosEgresos: "ingresosEgresosMensuales",
      cuentasPorCobrarPagar: "detalleCuentas",
      registroVentasCompras: "registroVentasCompras",
      proyeccionFlujoFondos: "proyeccionFlujoFondos",
      planFinancieroCredito: "planFinancieroCredito",
      estadosAuditados: "estadosContablesAuditados",
      estadosIntermedios: "estadosContableIntermedios",
      resumenCuentas: "resumenBancario",
      inventariosValuaciones: "inventariosActuales",
      detalleActivosFijos: "activosFijos",
      ratiosFinancieros: "ratiosFinancieros",
      certificacionContable: "certificacionContable",
    };

    // Agregar archivos reales al FormData
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
      localStorage.setItem("creditInfo", JSON.stringify({ ...creditInfo, credit: updatedCredit, PasoActual: 3 }));

      setPasoActual(3); // avanzar al paso siguiente
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
