import 'bootstrap/dist/css/bootstrap.min.css';
import style from './WelcomeBadge.module.css';

/**
 * Componente WelcomeBadge
 * Badge de bienvenida con gradiente oscuro y bordes redondeados
 * 
 * @param {string} text - Texto a mostrar en el badge
 * @returns {JSX.Element} Badge estilizado con gradiente verde oscuro
 */

export const WelcomeBadge = ({ text }) => (
  <div className={style.titulo}>
    {text}
  </div>
);