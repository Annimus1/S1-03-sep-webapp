import React, { useState } from "react";
import { MiniFormsTemplate } from "../plantilla/MiniFormsTemplate";
import { TextInput } from "../atomos/TextInput";
import styles from "./Seis.module.css";
import { BotonAnimado } from "../../../../globals/components/atomos/BotonAnimado";

export const Seis = ({ setPasoActual }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const handleBack = () => {
    setPasoActual(4); // vuelve al paso anterior
  };

  const handleTextChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));

    // Limpiar error al escribir
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleVerContrato = () => {
    // Aquí puedes abrir un modal o redirigir a ver el contrato
    alert("Abriendo vista previa del contrato...");
    // window.open('/contrato-preview', '_blank');
  };

  const handleFirmar = () => {
    // Validar campos
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = "El correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Ingresa un correo electrónico válido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simular proceso de firma
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      console.log("Firma digital enviada:", formData);
      alert("¡Solicitud firmada y enviada exitosamente! ✅");
      // Aquí podrías redirigir a una página de confirmación
      // setPasoActual(6); o history.push('/confirmacion')
    }, 2000);
  };

  return (
    <MiniFormsTemplate
      onBack={handleBack}
      onContinue={handleFirmar}
      isSaving={isSaving}
      text=""
      continueButtonText="Ir a firma segura"
      showFooterNote={false} // 👈 No mostrar mensaje de PDF en este paso
    >
      <div className={styles.firmaContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>Firma digital</h2>
          <p className={styles.subtitle}>
            Firma digital segura para finalizar tu solicitud.
          </p>
        </div>

        <div className={styles.infoBox}>
          <p className={styles.infoText}>
            Tu solicitud está casi lista.
          </p>
          <p className={styles.infoTextBold}>
            Solo falta firmar digitalmente el contrato a través de nuestro "espacio seguro Kredia", 
            para garantizar la seguridad y validez legal de tu crédito.
          </p>
        </div>

        <div className={styles.formFields}>
          <div className={styles.fieldWrapper}>
            <label className={styles.label}>Correo electrónico</label>
            <TextInput
              name="email"
              type="email"
              placeholder="tuempresa@correo.com"
              value={formData.email}
              onChange={handleTextChange}
              error={errors.email}
            />
          </div>

          <div className={styles.fieldWrapper}>
            <label className={styles.label}>Contraseña</label>
            <TextInput
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleTextChange}
              error={errors.password}
            />
          </div>
        </div>

        <p className={styles.securityNote}>
          Usaremos esta información solo para verificar tu identidad en el sistema de firma digital.
        </p>

        <BotonAnimado
          variante="moradoSuave"
          className={styles.previewButton}
          onClick={handleVerContrato}
        >
          Ver contrato antes de firmar
        </BotonAnimado>
      </div>
    </MiniFormsTemplate>
  );
};