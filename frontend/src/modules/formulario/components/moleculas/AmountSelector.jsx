import { AmountButton } from "../atomos/AmountButton";

export const AmountSelector = ({ selectedAmount, onSelectAmount }) => {
  const amounts = ['2.5K', '12.5K', '25K', '40K', '55.5K'];
  
  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap'
    }}>
      {amounts.map((amount) => (
        <AmountButton
          key={amount}
          amount={amount}
          isSelected={selectedAmount === amount}
          onClick={() => onSelectAmount(amount)}
        />
      ))}
    </div>
  );
};