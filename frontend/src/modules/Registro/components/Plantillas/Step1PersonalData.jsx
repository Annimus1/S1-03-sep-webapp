import { useState } from "react";
import { FormCard } from "../organismos/FormCard";
import { InputField } from "../atomos/InputField";
import { BotonAnimado } from '../../../../globals/components/atomos/BotonAnimado';
import { PasswordStrengthIndicator } from "../moleculas/PasswordStrengthIndicator";
import styled from "./Step.module.css"

export const Step1PersonalData = ({ formData, onChange, onNext, userType }) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Campo requerido';
    if (!formData.emailConfirm) newErrors.emailConfirm = 'Campo requerido';
    if (formData.email !== formData.emailConfirm) {
      newErrors.emailConfirm = 'Los correos no coinciden';
    }
    if (!formData.nombre) newErrors.nombre = 'Campo requerido';
    if (!formData.apellido) newErrors.apellido = 'Campo requerido';
    if (!formData.password) newErrors.password = 'Campo requerido';
    if (formData.password.length < 8) newErrors.password = 'Mínimo 8 caracteres';
    if (!formData.passwordConfirm) newErrors.passwordConfirm = 'Campo requerido';
    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = 'Las contraseñas no coinciden';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onNext();
  };

  return (
    <FormCard errorMessage={Object.keys(errors).length > 2 && "No es posible continuar"}>
      <div className={styled.gridContainerTwo }>
        <InputField
          label="Correo electrónico"
          type="email"
          placeholder="tuempresa@correo.com"
          value={formData.email}
          onChange={(e) => onChange('email', e.target.value)}
          error={errors.email}
        />
        <InputField
          label="Confirma tu correo electrónico"
          type="email"
          placeholder="tuempresa@correo.com"
          value={formData.emailConfirm}
          onChange={(e) => onChange('emailConfirm', e.target.value)}
          error={errors.emailConfirm}
        />
      </div>

      <div className={styled.gridContainerTwo }>
        <InputField
          label="Nombre"
          placeholder="María"
          value={formData.nombre}
          onChange={(e) => onChange('nombre', e.target.value)}
          error={errors.nombre}
        />
        <InputField
          label="Apellido"
          placeholder="Sánchez"
          value={formData.apellido}
          onChange={(e) => onChange('apellido', e.target.value)}
          error={errors.apellido}
        />
      </div>

      <div className={styled.gridContainerTwo }>
        <div>
          <InputField
            label="Contraseña"
            type="password"
            placeholder="********"
            value={formData.password}
            onChange={(e) => onChange('password', e.target.value)}
            error={errors.password}
          />
          <PasswordStrengthIndicator password={formData.password} />
        </div>
        <InputField
          label="Confirma tu contraseña"
          type="password"
          placeholder="********"
          value={formData.passwordConfirm}
          onChange={(e) => onChange('passwordConfirm', e.target.value)}
          error={errors.passwordConfirm}
        />
      </div>

      <div style={{ fontSize: '13px', color: '#4a5568', marginBottom: '20px' }}>
        • Usa al menos 8 caracteres, una mayúscula, un número y un símbolo.
      </div>

      <div style={{ textAlign: 'center' }}>
        <BotonAnimado onClick={handleSubmit}>Continuar</BotonAnimado>
      </div>
    </FormCard>
  );
};