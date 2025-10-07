import 'bootstrap/dist/css/bootstrap.min.css';
import { TarjetaCaracteristica } from '../moleculas/TarjetaCaracteristica';

/**
 * Sección principal con título y tarjetas de características
 * Es la primera sección que ve el usuario
 */
export const SeccionHero = () => (
  <section style={{padding: '50px 0' }}>
    <div className="container">
      {/* Título principal y subtítulo */}
      <div className="text-center text-white mb-4">
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 700, marginBottom: 15, lineHeight: 1.2, backgroundColor: '#1a4a4a', padding: '20px', borderRadius: '30px' }}>
          Financia tu crecimiento con agilidad y confianza
        </h1>
        <p style={{ fontSize: 'clamp(14px, 2.5vw, 18px)', color: '#000000ff', maxWidth: '800px', margin: '0 auto' }}>
          Solicita, carga tus documentos y haz seguimiento en <span style={{ color: '#7B1FA2', fontWeight: 'bold' }}>tiempo real</span>, todo desde una sola plataforma.
        </p>
      </div>
      
      {/* Tarjetas de características */}
      <div className="row g-3" style={{ maxWidth: '1200px', margin: '0 auto'  }}>

        <div className="col-12 col-md-6">
          <TarjetaCaracteristica altura="500px">
            Tu crédito PyME <span style={{ color: '#7B1FA2', fontWeight: 'bold' }}>100%</span> digital, rápido y seguro.
          </TarjetaCaracteristica>
        </div>

        <div className="col-12 col-md-6">
          <TarjetaCaracteristica titulo="" 
          textoBoton="Impulsa tu negocio hoy"
          altura="400px"/>
        </div>
      </div>
    </div>
  </section>
);