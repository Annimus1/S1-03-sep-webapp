import 'bootstrap/dist/css/bootstrap.min.css';
import { TarjetaCaracteristica } from '../moleculas/TarjetaCaracteristica';
import Silver from '../../../../../public/Silver.png';
import MacBookPro16 from '../../../../../public/MacBookPro16.png';
import { useState, useEffect } from 'react';

export const SeccionHero = () => {
  const [tarjetaAltura, setTarjetaAltura] = useState("400px");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) { // móvil < md
        setTarjetaAltura("300px");
      } else {
        setTarjetaAltura("450px");
      }
    };

    handleResize(); // set inicial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section style={{padding: '50px 0' }}>
      <div className="container">
        <div className="text-center text-white mb-4">
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 700, marginBottom: 15, lineHeight: 1.2, backgroundColor: '#1a4a4a', padding: '20px', borderRadius: '30px' }}>
            Financia tu crecimiento con agilidad y confianza
          </h1>
          <p style={{ fontSize: 'clamp(14px, 2.5vw, 18px)', color: '#000000ff', maxWidth: '800px', margin: '0 auto' }}>
            Solicita, carga tus documentos y haz seguimiento en <span style={{ color: '#7B1FA2', fontWeight: 'bold' }}>tiempo real</span>, todo desde una sola plataforma.
          </p>
        </div>
        
        <div className="row g-3" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="col-12 col-md-6">
            <TarjetaCaracteristica 
              altura={tarjetaAltura} 
              imagenSrc={Silver} 
              imagenAlt="MacBook mostrando la plataforma de Kredia"
            >
              Tu crédito PyME <span style={{ color: '#7B1FA2', fontWeight: 'bold' }}>100%</span> digital, rápido y seguro.
            </TarjetaCaracteristica>
          </div>

          <div className="col-12 col-md-6">
            <TarjetaCaracteristica 
              textoBoton="Impulsa tu negocio hoy"
              imagenSrc={MacBookPro16} 
              imagenAlt="MacBook mostrando la plataforma de Kredia"
              altura={tarjetaAltura} 
              colorFondo="#aff3eaff"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
