import { StepItem } from "../moleculas/StepItem";
import { StepConnector } from "../moleculas/StepConnector";
import React from "react";

export const RegistrationStepper = ({ currentStep = 0 }) => {
  const steps = [
    { number: 0, label: "Monto solicitado" },
    { number: 1, label: "Verificación de Identidad" },
    { number: 2, label: "Información financiera" },
    { number: 3, label: "Información operativa" },
    { number: 4, label: "Propósito del crédito" },
    { number: 5, label: "Validación Crediticia" },
    { number: 6, label: "Firma digital" },
  ];

  return (
    <div className="stepper-container">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.number;
        const isActive = currentStep === step.number;

        // Determinar progreso de conectores
        let completedCount = 0;
        if (currentStep > step.number) completedCount = 3;
        else if (currentStep === step.number) completedCount = 2;

        return (
          <React.Fragment key={step.number}>
            <StepItem
              number={step.number}
              label={step.label}
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
  );
};