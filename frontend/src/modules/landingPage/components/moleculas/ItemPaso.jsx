import { NumeroPaso } from "../atomos/NumeroPaso";
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Elemento individual que muestra un paso del proceso
 * @param {number} numero - Número del paso
 * @param {string} titulo - Título del paso
 * @param {string} descripcion - Descripción detallada del paso
 */
export const ItemPaso = ({ numero, titulo, descripcion }) => (
  <div className="d-flex mb-3 align-items-start">
    {/* Número del paso en círculo */}
    <div className="me-3">
      <NumeroPaso numero={numero} />
    </div>
    {/* Contenido del paso */}
    <div>
      <h6 style={{ color: '#000000ff', fontWeight: 600, marginBottom: 6, fontSize: '15px' }}>{titulo}</h6>
      <p style={{ color: '#000000ff', fontSize: '13px', margin: 0, lineHeight: 1.5 }}>{descripcion}</p>
    </div>
  </div>
);