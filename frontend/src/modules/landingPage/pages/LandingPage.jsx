import { Header } from "../components/organismos/Header";
import { SeccionFAQ } from "../components/organismos/SeccionFAQ";
import { SeccionHero } from "../components/organismos/SeccionHero";
import { SeccionPasos } from "../components/organismos/SeccionPasos";
import { SeccionSimulador } from "../components/organismos/SeccionSimulador";


/**
 * Esta es la página completa de aterrizaje de Kredia
 */
export const LandingPage = () => (
  <div>
    <Header/>
  <div
    className="container"
    style={{
      maxWidth: 1400,
      margin: '0 auto',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '30px'            
    }}
  >
  <div style={{ borderRadius: '20px', overflow: 'hidden' }}>
    <SeccionHero />
  </div>

  <div style={{ borderRadius: '20px', overflow: 'hidden' }}>
    <SeccionPasos />
  </div>

  <div style={{ borderRadius: '20px', overflow: 'hidden' }}>
    <SeccionSimulador />
  </div>

  <div style={{ borderRadius: '20px', overflow: 'hidden' }}>
    <SeccionFAQ />
  </div>
  </div>

  </div>
);