import 'bootstrap/dist/css/bootstrap.min.css';
import { MarcadorPosicionIcono } from '../atomos/MarcadorPosicionIcono';
import { ItemPaso } from '../moleculas/ItemPaso';
import { BotonAnimado } from "../../../../globals/components/atomos/BotonAnimado";
import { useNavigate } from "react-router";


/**
 * Sección que explica los 3 pasos simples para obtener el crédito
 */
export const SeccionPasos = () => {
  const navigate = useNavigate();
  
  return(
  <section>
    <div className="container">
      <div className="row align-items-center">
          <h2 style={{ color: 'white', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, marginBottom: 30, backgroundColor: '#7B1FA2', padding: '30px 0', borderRadius: 30, textAlign: 'center', maring: '0 auto' }}>
            Tu crédito en tres pasos simples
          </h2>
        {/* Columna izquierda: Lista de pasos */}
        <div className="col-12 col-lg-7 mb-4 mb-lg-0" style={{ background: '#f5dcffff', padding: '30px', borderRadius: 20 }}>
          {/* Paso 1: Registro */}
          <ItemPaso 
            numero="1"
            titulo="Regístrate y completa tu perfil"
            descripcion="Crea tu cuenta en minutos. Solo necesitas tu DNI y algunos datos básicos de tu empresa. Nuestro formulario es simple y rápido."
          />
          
          {/* Paso 2: Documentación */}
          <ItemPaso 
            numero="2"
            titulo="Carga tus documentos y firma digitalmente"
            descripcion="Sube tu información de forma protegida. Validamos tu identidad y documentos con tecnología KYC para tu tranquilidad."
          />
          
          {/* Paso 3: Seguimiento */}
          <ItemPaso 
            numero="3"
            titulo="Recibe tu evaluación y haz seguimiento"
            descripcion="Consulta el estado de tu solicitud en tiempo real desde tu panel. Te notificamos en cada avance y te acompañamos durante todo el proceso."
          />
          
          {/* Botón para comenzar */}
          <div className="mt-4">
            <BotonAnimado variante="naranja" onClick={()=>{navigate('/registro')}}>Comienza tu solicitud</BotonAnimado>
          </div>
        </div>
        
        {/* Columna derecha: Imagen ilustrativa */}
        <div className="col-12 col-lg-5">
          <div style={{ backgroundColor: 'white', borderRadius: 20, padding: 30 }}>
            <MarcadorPosicionIcono size={150} />
          </div>
        </div>
      </div>
    </div>
  </section>
)
};