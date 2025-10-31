import { ProgressBar } from "../atomos/ProgressBar";

export const ProgressSteps = ({ currentStep = 3, totalSteps = 5 }) => (
  <div style={{
    display: 'flex',
    gap: '12px',
    marginBottom: '10px',
    flexWrap: 'wrap'
  }}>
    {Array.from({ length: totalSteps }, (_, index) => (
      <ProgressBar
        key={index}
        completed={index < currentStep - 1}
        active={index === currentStep - 1}
      />
    ))}
  </div>
);