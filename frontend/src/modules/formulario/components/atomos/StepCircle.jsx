export const StepCircle = ({ number, isActive, isCompleted }) => {
  const getClassName = () => {
    if (isCompleted) return "step-circle completed";
    if (isActive) return "step-circle active";
    return "step-circle";
  };

  return (
    <div className={getClassName()}>{number}</div>
  );
};