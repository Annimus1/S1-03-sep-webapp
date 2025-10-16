import { CardHeader } from "../moleculas/CardHeader";
import { ProgressSteps } from "../moleculas/ProgressSteps";
import { BotonAnimado } from "../../../../globals/components/atomos/BotonAnimado";
import { StatusMessage } from "../atomos/StatusMessage";

export const StartApplicationCardActivo = ({
  height = '100%',
  title = 'Avance de la solicitud',
  showProgress = false,
  currentStep = 3,
  totalSteps = 5,
  showButton = false,
  buttonText = 'Iniciar solicitud de crédito PyME',
  showViewButton = false,
  viewButtonText = 'Ver mi solicitud',
  statusMessage = null,
  statusMessageColor = '#FFD88C',
  onButtonClick,
  onViewButtonClick,
  backgroundColor = '#5BE2C580'
}) => (
  <div style={{
    backgroundColor: backgroundColor,
    borderRadius: '20px',
    padding: '8px 30px',
    height: height
  }}>
    <CardHeader
      title={title}
      showButton={showViewButton}
      buttonText={viewButtonText}
      onButtonClick={onViewButtonClick}
    />
    
    {showProgress && (
      <ProgressSteps 
        currentStep={currentStep} 
        totalSteps={totalSteps} 
      />
    )}
    
    {showButton && (
      <BotonAnimado 
        variante="naranja"
        onClick={onButtonClick}
      >
        {buttonText}
      </BotonAnimado>
    )}
    
    {statusMessage && (
      <StatusMessage backgroundColor={statusMessageColor}>
        {statusMessage}
      </StatusMessage>
    )}
  </div>
);