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
    estudioFactibilidad: null, // ✅ corregido
    permisosObra: null,
    planMantenimiento: null,
    facturaProforma: null, // ✅ corregido
    informeTecnico: null,

    // Capital de Trabajo
    detalleFondos: null,
    proyeccionFlujoOperativo: null,
    gastosOperativos: null,
    evidenciaExpancion: null,
  });

  const [isSaving, setIsSaving] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;
  const creditInfo = JSON.parse(localStorage.getItem("creditInfo"));
  const creditId = creditInfo?.credit?._id;
  const userId = creditInfo?.credit?.userId;
  const creditType = creditInfo?.credit?.creditType;

  const handleBack = () => {
    setPasoActual(3);
  };

  const handleContinue = async () => {
    if (!creditId) {
      alert("No se encontró el ID del crédito en localStorage");
      return;
    }

    const data = new FormData();
    data.append("userId", userId);
    data.append("creditType", creditType);
    data.append("estatus", "documentacion_credito");
    data.append("datosVerificados", false);

    const fileMap = {
      // Crédito de Inversión
      presupuestoInversion: "presupuestoInversion",
      cotizacionProveedores: "cotizacionProveedores",
      planImplementacion: "planImplementacion",
      estudioFactibilidad: "estudioFactibilidad", // ✅ corregido
      permisosObra: "permisosObra",
      planMantenimiento: "planMantenimiento",
      facturaProforma: "facturaProforma", // ✅ corregido
      informeTecnico: "informeTecnico",

      // Capital de Trabajo
      detalleFondos: "detalleFondos",
      proyeccionFlujoOperativo: "proyeccionFlujoOperativo",
      gastosOperativos: "gastosOperativos",
      evidenciaExpancion: "evidenciaExpancion",
    };

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
      setPasoActual(5);
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
          errors={{}}
          setErrors={() => {}}
          tipoCredito={tipoCredito}
          setTipoCredito={setTipoCredito}
        />
      </div>
    </MiniFormsTemplate>
  );
};
