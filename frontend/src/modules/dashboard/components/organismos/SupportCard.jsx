import { BotonAnimado } from "../../../../globals/components/atomos/BotonAnimado";

export const SupportCard = ({height = '100%', text1 = 'Chatea con nosotros', text2 = 'Envíanos un email', heightBotom = '100%'}) => (
  <div style={{
    backgroundColor: '#DAD6FE',
    borderRadius: '40px',
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
      <BotonAnimado variant="moradoSuave" height={heightBotom}>{text1}</BotonAnimado>
      <BotonAnimado variant="moradoSuave" height={heightBotom}>{text2}</BotonAnimado>
    </div>
  </div>
);