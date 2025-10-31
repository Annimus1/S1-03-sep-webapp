import styles from "../../styles/StepperNavegacion.module.css";
import { BotonNavegacion } from "../atomos/BotonNavegacion";
import { StepConnector } from "../moleculas/StepConnector";
import { StepItem } from "../moleculas/StepItem";
import React from "react";

export const StepperConNavegacion = ({ 
  currentStep, 
  steps,
  onStepChange,
  onComplete 
}) => {
  const handleAnterior = () => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1);
    }
  };

  const handleSiguiente = () => {
    if (currentStep < steps.length - 1) {
      onStepChange(currentStep + 1);
    } else {
      // Último paso - completar
      if (onComplete) {
        onComplete();
      }
    }
  };

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className={styles.containerPrincipal}>
      {/* Botón Anterior */}
      <BotonNavegacion
        direccion="anterior"
        onClick={handleAnterior}
        disabled={isFirstStep}
      />

      {/* Stepper */}
      <div className={styles.stepperContainer}>
        {steps.map((step, index) => {
          const isCompleted = currentStep > index;
          const isActive = currentStep === index;

          // Determinar progreso de conectores
          let completedCount = 0;
          if (currentStep > index) completedCount = 3;
          else if (currentStep === index) completedCount = 2;

          return (
            <React.Fragment key={index}>
              <StepItem
                number={index + 1}
                label={step}
                isActive={isActive}
                isCompleted={isCompleted}
              />
              {index < steps.length - 1 && (
                <StepConnector completedCount={completedCount} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Botón Siguiente */}
      <BotonNavegacion
        direccion="siguiente"
        onClick={handleSiguiente}
        disabled={false}
      />
    </div>
  );
};