import { NotificationIcon } from '../atomos/NotificationIcon';
import { NotificationMessage } from './NotificationMessage';
export const NotificationItem = ({ 
  message, 
  type = 'warning',
  backgroundColor = '#FFD88C',
  showIcon = true 
}) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px'
  }}>
    {showIcon && <NotificationIcon type={type} />}
    <NotificationMessage backgroundColor={backgroundColor}>
      {message}
    </NotificationMessage>
  </div>
);