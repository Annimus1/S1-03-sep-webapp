import { SecondaryButton } from '../atomos/SecondaryButton';

export const TabSelector = ({ activeTab, onTabChange }) => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: '30px', 
    gap: '16px' 
  }}>
    <SecondaryButton active={activeTab === 'pyme'} onClick={() => onTabChange('pyme')}>
      Registrar PyME
    </SecondaryButton>
    <div style={{ width: '2px', height: '40px', backgroundColor: '#d0d0d0' }} />
    <SecondaryButton active={activeTab === 'asesor'} onClick={() => onTabChange('asesor')}>
      Nuevo Asesor
    </SecondaryButton>
  </div>
);