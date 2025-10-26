export const AmountButton = ({ amount, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: isSelected ? '#E9D5FF' : 'white',
        color: '#333',
        border: 'none',
        borderRadius: '8px',
        padding: '10px 20px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        minWidth: '70px'
      }}
      onMouseOver={(e) => {
        if (!isSelected) e.currentTarget.style.backgroundColor = '#F3F4F6';
      }}
      onMouseOut={(e) => {
        if (!isSelected) e.currentTarget.style.backgroundColor = 'white';
      }}
    >
      {amount}
    </button>
  );
};