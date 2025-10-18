import { GridContainer } from "../../../../globals/components/atomos/GridContainer";
import { EmptyStateMessage } from "../atomos/EmptyStateMessage";
import { NotificationItem } from "./NotificationItem";

export const NotificationCard = ({
  height = '100%',
  title = 'Notificaciones',
  notifications = [],
  emptyMessage = 'Aquí podrás visualizar cualquier actualización de tu solicitud',
  backgroundColor = '#5BE2C5',
  columns = '1fr'
}) => {
  const hasNotifications = notifications && notifications.length > 0;

  return (
    <div style={{
      backgroundColor: backgroundColor,
      borderRadius: '40px',
      padding: '20px 24px',
      height: height
    }}>
      <h6 style={{
        color: '#000000',
        fontSize: '16px',
        fontWeight: '600',
        marginBottom: hasNotifications ? '16px' : '6px'
      }}>
        {title}
      </h6>

        {hasNotifications ? (
          <div>
            <GridContainer columns={columns} gap="0px">
              {notifications.map((notification, index) => (
                <NotificationItem
                  key={index}
                  message={notification.message}
                  type={notification.type || 'warning'}
                  backgroundColor={notification.backgroundColor || '#FFD88C'}
                  showIcon={notification.showIcon !== false}
                />
              ))}
            </GridContainer>
          </div>
        ) : (
          <EmptyStateMessage text={emptyMessage} />
        )}
    </div>
  );
};