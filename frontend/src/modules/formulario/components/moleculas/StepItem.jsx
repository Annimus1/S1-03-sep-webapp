import { StepCircle } from "../atomos/StepCircle";

export const StepItem = ({ number, label, isActive, isCompleted }) => (
  <div className="step-item">
    <StepCircle number={number} isActive={isActive} isCompleted={isCompleted} />
    <div className={`step-label ${isActive ? "active" : ""}`}>{label}</div>
  </div>
);