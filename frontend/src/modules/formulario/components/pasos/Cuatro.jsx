import React, { useState } from "react";
import axios from "axios";
import { MiniFormsTemplate } from "../plantilla/MiniFormsTemplate";
import { TipoCredito } from "../organismos/TipoCredito";
import styles from "./FormSections.module.css";

export const Cuatro = ({ setPasoActual }) => {
  const [tipoCredito, setTipoCredito] = useState("inversion");
  const [formData, setFormData] = useState({
    // Crédito de Inversión
    presupuestoInversion: null,
    cotizacionProveedores: null,
    planImplementacion: null,
    estudionFactibilidad: null,
    permisosObra: null,
    planMantenimiento: null,
    facturaProforma: null,
    informeTecnico: null,

    // Capital de Trabajo
    detalleFondos: null,
    proyeccionFlujoOperativo: null,
    gastosOperativos: null,
    facturasProforma: null,
    evidenciaExpancion: null,
  });

  const [isSaving, setIsSaving] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;
  const creditInfo = JSON.parse(localStorage.getItem("creditInfo"));
  const creditId = creditInfo?.credit?._id;
  const userId = creditInfo?.credit?.userId;
  const creditType = creditInfo?.credit?.creditType;

  // ⬅️ Botón Atrás
  const handleBack = () => {
    setPasoActual(3);
  };

  // ✅ Subir archivos al backend (sin validaciones)
  const handleContinue = async () => {
    if (!creditId) {
      alert("No se encontró el ID del crédito en localStorage");
      return;
    }

    // 🧱 Construir el FormData
    const data = new FormData();
    data.append("userId", userId);
    data.append("creditType", creditType);
    data.append("estatus", "documentacion_credito");
    data.append("datosVerificados", false);

    // 🔹 Mapear campos de frontend → backend
    const fileMap = {
      // Crédito de Inversión
      presupuestoInversion: "presupuestoInversion",
      cotizacionProveedores: "cotizacionProveedores",
      planImplementacion: "planImplementacion",
      estudionFactibilidad: "estudionFactibilidad",
      permisosObra: "permisosObra",
      planMantenimiento: "planMantenimiento",
      facturaProforma: "facturaProforma",
      informeTecnico: "informeTecnico",

      // Capital de Trabajo
      detalleFondos: "detalleFondos",
      proyeccionFlujoOperativo: "proyeccionFlujoOperativo",
      gastosOperativos: "gastosOperativos",
      facturasProforma: "facturasProforma",
      evidenciaExpancion: "evidenciaExpancion",
    };

    // Agregar solo los archivos que tengan valor
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

      // Actualizar creditInfo en localStorage
      const updatedCredit = response.data?.data?.credit;
      localStorage.setItem(
        "creditInfo",
        JSON.stringify({
          ...creditInfo,
          credit: updatedCredit,
          PasoActual: 5,
        })
      );

      alert("Documentación del crédito subida correctamente.");
      setPasoActual(5); // avanzar al paso siguiente
    } catch (error) {
      console.error("❌ Error al subir documentos:", error);
      alert(
        "Error al subir la documentación. Verifica tu conexión o formato de archivos."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <MiniFormsTemplate
      onBack={handleBack}
      onContinue={handleContinue}
      isSaving={isSaving}
      text="Selecciona el tipo de crédito y adjunta la documentación que desees incluir."
    >
      <div className={styles.unifiedContent}>
        <TipoCredito
          formData={formData}
          setFormData={setFormData}
          errors={{}} // sin errores
          setErrors={() => {}} // función vacía
          tipoCredito={tipoCredito}
          setTipoCredito={setTipoCredito}
        />
      </div>
    </MiniFormsTemplate>
  );
};
