import logoImgLetraNegra from '../../../assets/LogoLetraNegra.svg';
import logoImgLetraBlanca from '../../../assets/LogoLetraBlanca.svg';

/**
 * Componente que muestra el logotipo de Kredia.
 * Incluye el ícono con la letra K y el nombre de la marca.
 * 
 * @param {boolean} isWhite - Si es true, muestra el logo con letra blanca.
 * @param {string|number} maxWidth - Máximo ancho del logo (ej: '50px' o 50).
 */
export const Logo = ({ isWhite = false, maxWidth = 160 }) => {
  const logo = isWhite ? logoImgLetraBlanca : logoImgLetraNegra;

  return (
    <div className="d-flex align-items-center">
      <a href="/">
        <img
          src={logo}
          alt="Logo Kredia"
          style={{
            width: '100%',
            maxWidth: maxWidth,
            height: 'auto',
            marginRight: '5px',
          }}
        />
      </a>
    </div>
  );
};