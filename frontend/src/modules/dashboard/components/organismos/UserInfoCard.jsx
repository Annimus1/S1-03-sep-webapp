import { UserAvatar } from "../../../../globals/components/atomos/UserAvatar";
import { VerifyButton } from "../atomos/VerifyButton";
import { InfoRow } from "../moleculas/InfoRow";

export const UserInfoCard = ({ 
  name = 'Pablo Cortéz',
  company = '"Mobile Tech"',
  email = 'pabloc.admin@mobilet.com',
  score = '405 pts'
}) => (
  <div style={{
    background: 'white',
    borderRadius: '24px',
    padding: '28px',
    margin: '0 auto',
    width: '100%',
  }}>
    <UserAvatar />
    <div style={{marginTop: '-25px'}}>
      <InfoRow 
        leftLabel="Nombre"
        leftValue={name}
        rightLabel="Empresa"
        rightValue={company}
      />
    </div>
    
    <div style={{marginTop: '-25px'}}>
      <InfoRow 
        leftLabel="Email"
        leftValue={email}
        rightLabel="Score"
        rightValue={score}
      />
    </div>
    
    <div style={{marginTop: '-10px'}}>
      <VerifyButton />
    </div>
  </div>
);