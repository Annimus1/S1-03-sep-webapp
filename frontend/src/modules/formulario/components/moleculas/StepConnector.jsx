import { MiniCircle } from "../atomos/MiniCircle";

export const StepConnector = ({ completedCount }) => (
  <div className="step-connector">
    {[0, 1, 2].map((i) => (
      <MiniCircle key={i} isActive={i < completedCount} />
    ))}
  </div>
);