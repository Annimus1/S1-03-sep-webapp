import { BotonAnimado } from "../../../../globals/components/atomos/BotonAnimado";

export const StartApplicationCard = ({height = '100%'}) => (
  <div style={{
    backgroundColor: '#5BE2C580',
    borderRadius: '20px',
    padding: '24px 30px',
    height: height
  }}>
    <h5 style={{
      color: '#2C3E50',
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '18px'
    }}>Avance de la solicitud</h5>
    <BotonAnimado variante="naranja">
      Iniciar solicitud de crédito PyME
    </BotonAnimado>
  </div>
);