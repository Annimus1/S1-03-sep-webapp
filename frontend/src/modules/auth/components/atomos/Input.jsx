import 'bootstrap/dist/css/bootstrap.min.css';


/**
 * Componente Input personalizado
 * Campo de entrada con estilos personalizados y estados de error
 * 
 * @param {string} type - Tipo de input: 'text', 'email', 'password', etc.
 * @param {string} placeholder - Texto de placeholder
 * @param {string} value - Valor actual del input
 * @param {function} onChange - Función para manejar cambios en el valor
 * @param {boolean} hasError - Indica si el campo tiene un error (cambia estilos)
 * @param {boolean} disabled - Si el input está deshabilitado
 * @returns {JSX.Element} Input estilizado con manejo de errores
 */

export const Input = (
  {
    type = 'text',
    placeholder,
    value,
    onChange,
    hasError,
    disabled
  }) => (
    <input type={type}
    className='form-control'
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    disabled={disabled}

    style={
      {
        padding: '12px 16px',
        borderRadius: '12px',
        color: hasError ? '#952014' : '#21255299',
        backgroundColor: hasError ? '#FFF5F5' : '#F7FAFC',
        fontSize: '14px',
        transition: 'all 0.5s',
      }
    }

    />
);