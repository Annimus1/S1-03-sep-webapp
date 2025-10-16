import { BotonAnimado } from "../../../../globals/components/atomos/BotonAnimado";

export const SupportCard = ({height = '100%'}) => (
  <div style={{
    backgroundColor: '#DAD6FE',
    borderRadius: '20px',
    padding: '24px',
    height: height
  }}>
    <h5 style={{
      color: '#2C3E50',
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '18px'
    }}>Soporte y ayuda</h5>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <BotonAnimado variant="moradoSuave">Chatea con nosotros</BotonAnimado>
      <BotonAnimado variant="moradoSuave">Envíanos un email</BotonAnimado>
    </div>
  </div>
);