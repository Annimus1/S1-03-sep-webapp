export const ProgressBar = ({ completed = false, active = false, style = {} }) => (
  <div style={{
    width: '90px',
    height: '12px',
    borderRadius: '10px',
    backgroundColor: completed ? '#044574' : active ? '#F4D35E' : '#F5F6F8',
    transition: 'all 0.3s ease',
    ...style
  }} />
);