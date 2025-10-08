import 'bootstrap/dist/css/bootstrap.min.css';
import { Label } from '../atomos/Label';
import { Input } from '../atomos/Input';
import { HelpText } from '../atomos/HelpText';
import { ErrorText } from '../atomos/ErrorText';

/**
 * Componente FormFieldLogin
 * Campo de formulario completo con label, input, texto de ayuda y manejo de errores
 * Combina múltiples átomos para crear un campo de formulario funcional
 * 
 * @param {string} label - Etiqueta del campo
 * @param {string} type - Tipo de input ('text', 'email', 'password')
 * @param {string} placeholder - Texto placeholder del input
 * @param {string} value - Valor actual del campo
 * @param {function} onChange - Función para manejar cambios
 * @param {string} helpText - Texto de ayuda debajo del input
 * @param {string} errorText - Mensaje de error (si existe)
 * @param {boolean} disabled - Si el campo está deshabilitado
 * @returns {JSX.Element} Campo de formulario completo
 */

export const FormFieldLogin = (
  {
    label, 
    type, 
    placeholder, 
    value, 
    onChange, 
    helpText,
    errorText,
    disabled 
  }) => (
    <div className='mb-3'>
      <Label htmlFor={label}>{label}</Label>
      <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      hasError={!!errorText}
      disabled={disabled}
      />
      {/* Muestra texto de ayuda si existe */}
    {helpText && <HelpText>{helpText}</HelpText>}
    {/* Muestra error si existe */}
    {errorText && <ErrorText>{errorText}</ErrorText>}
  </div>
);