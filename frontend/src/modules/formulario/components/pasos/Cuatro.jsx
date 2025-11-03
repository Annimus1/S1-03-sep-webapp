import React, { useEffect, useState } from "react";
import axios from "axios";
import { MiniFormsTemplate } from "../plantilla/MiniFormsTemplate";
import styles from "./FormSections.module.css";
import { CreditoInversion } from "../organismos/CreditoInversion";
import { CreditoCapitalTrabajo } from "../organismos/CreditoCapitalTrabajo";
import { BotonAnimado } from "../../../../globals/components/atomos/BotonAnimado";

export const Cuatro = ({ setPasoActual }) => {
  const [formData, setFormData] = useState({
    presupuestoInversion: null,
    cotizacionProveedores: null,
    estudioFactibilidad: null,
    planMantenimiento: null,
    informeTecnico: null,
    planImplementacion: null,
    permisosObra: null,
    facturaProforma: null,
    detalleFondos: null,
    proyeccionFlujoOperativo: null,
    gastosOperativos: null,
    evidenciaExpancion: null,
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isPrimeraParte, setIsPrimeraParte] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;
  const creditInfo = JSON.parse(localStorage.getItem("creditInfo"));
  const token = localStorage.getItem("creditInfo");
  const creditId = creditInfo?.credit?._id;
  const userId = creditInfo?.credit?.userId;
  const creditType = creditInfo?.credit?.creditType;

  // 🔁 Cambiar entre Parte 1 y Parte 2
  const handleParteToggle = () => setIsPrimeraParte(!isPrimeraParte);

  // ⬅️ Botón Atrás
  const handleBack = () => {
    if (isPrimeraParte) {
      setPasoActual(4);
    } else {
      handleParteToggle();
    }
  };

    // ✅ Validar y subir archivos
  const handleContinue = async () => {
    console.log("🚀 Iniciando handleContinue");
    console.log("👉 Parte actual:", isPrimeraParte ? "Capital de trabajo" : "Inversión");

    // Definimos los requisitos según la parte activa
    let fieldRequirements = {};

    if (isPrimeraParte) {
      console.log("📋 Configurando campos requeridos para Capital de Trabajo...");
      fieldRequirements = {
        presupuestoInversion: true,
        cotizacionProveedores: true,
        estudioFactibilidad: true,
        planMantenimiento: true,
        informeTecnico: true,
        planImplementacion: true,
        permisosObra: true,
        facturaProforma: true,
        detalleFondos: false,
        proyeccionFlujoOperativo: false,
        gastosOperativos: false,
        evidenciaExpancion: false,
      };
    } else {
      console.log("📋 Configurando campos requeridos para Inversión...");
      fieldRequirements = {
        presupuestoInversion: false,
        cotizacionProveedores: false,
        estudioFactibilidad: false,
        planMantenimiento: false,
        informeTecnico: false,
        planImplementacion: false,
        permisosObra: false,
        facturaProforma: true,
        detalleFondos: true,
        proyeccionFlujoOperativo: true,
        gastosOperativos: true,
        evidenciaExpancion: true,
      };
    }

    // Validación
    console.log("✅ Iniciando validación de campos...");
    const newErrors = {};
    Object.entries(fieldRequirements).forEach(([field, isRequired]) => {
      if (isRequired && !formData[field]) {
        newErrors[field] = "Este campo es obligatorio";
        console.warn(`⚠️ Falta el campo requerido: ${field}`);
      }
    });

    if (Object.keys(newErrors).length > 0) {
      console.error("❌ Validación fallida. Errores detectados:", newErrors);
      setErrors(newErrors);
      return;
    }

    if (!creditId) {
      console.error("❌ No se encontró creditId. Abortando envío.");
      return;
    }

    console.log("🧩 creditId:", creditId);
    console.log("👤 userId:", userId);
    console.log("💳 creditType:", creditType);

    const data = new FormData();
    data.append("userId", userId);
    data.append("creditType", creditType);
    data.append("estatus", "documentacion_financiera");
    data.append("datosVerificados", false);

    // Mapeo frontend → backend
    const fileMap = {
      presupuestoInversion: "presupuestoInversion",
      cotizacionProveedores: "cotizacionProveedores",
      estudioFactibilidad: "estudioFactibilidad",
      planMantenimiento: "planMantenimiento",
      informeTecnico: "informeTecnico",
      planImplementacion: "planImplementacion",
      permisosObra: "permisosObra",
      facturaProforma: "facturaProforma",
      detalleFondos: "detalleFondos",
      proyeccionFlujoOperativo: "proyeccionFlujoOperativo",
      gastosOperativos: "gastosOperativos",
      evidenciaExpancion: "evidenciaExpancion",
    };

    Object.entries(fileMap).forEach(([frontendKey, backendKey]) => {
      if (formData[frontendKey]) {
        data.append(backendKey, formData[frontendKey]);
        console.log(`📎 Archivo agregado: ${frontendKey} → ${backendKey}`);
      }
    });

    try {
      setIsSaving(true);
      const token = localStorage.getItem("token");
      console.log("🔐 Token obtenido:", token ? "✅ OK" : "❌ No encontrado");
      console.log("📤 Enviando archivos a:", `${API_URL}/credit/upload/${creditId}`);

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

      console.log("📬 Respuesta del servidor:", response.data);

      const updatedCredit = response.data?.data?.credit;
      console.log("💾 Crédito actualizado:", updatedCredit);

      localStorage.setItem(
        "creditInfo",
        JSON.stringify({ ...creditInfo, credit: updatedCredit, PasoActual: 5 })
      );
      console.log("📦 creditInfo actualizado en localStorage con PasoActual = 5");

      setPasoActual(5);
      console.log("✅ Redirigiendo al paso 5...");
    } catch (error) {
      console.error("❌ Error al subir archivos:", error.response?.data || error.message);
    } finally {
      console.log("🏁 Finalizando handleContinue");
      setIsSaving(false);
    }
  };


  const isSiguientePaso = async () => {
    let siguientePaso = false;
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/credit/status-check`, { headers: { 'Authorization': `Bearer ${token}` } })
    const credit = response.data.credit;
    // for (let index = 0; index < requiredFields.length; index++) {
    //   siguientePaso = credit[requiredFields[index]] !== null && credit[requiredFields[index]] !== undefined;
    //   if (!siguientePaso) break;
    // }
    // if (siguientePaso) {
    //   localStorage.setItem("creditInfo", JSON.stringify({ ...creditInfo, credit: credit, PasoActual: 3 }));
    //   setPasoActual(4);
    // }
  }


  return (
    <div className={styles.contenedorPrincipal}>
      <BotonAnimado
        variant="moradoSuave"
        onClick={handleParteToggle}
        className={styles.botonPosicionado}
      >
        {isPrimeraParte ? "Ir a la Inversión" : "Ir a la Capital de Trabajo"}
      </BotonAnimado>

      <MiniFormsTemplate
        onBack={handleBack}
        onContinue={handleContinue}
        isSaving={isSaving}
        text="Sube la documentación técnica y financiera requerida para completar la evaluación de tu crédito"
      >
        <div className={styles.unifiedContent}>
          {isPrimeraParte ? (
            <CreditoCapitalTrabajo
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
            />
          ) : (
            <CreditoInversion
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
            />
          )}
        </div>
      </MiniFormsTemplate>
    </div>
  );
};