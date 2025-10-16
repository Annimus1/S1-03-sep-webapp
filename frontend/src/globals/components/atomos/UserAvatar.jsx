import User from '../../../assets/icons/User.svg';

export const UserAvatar = ({ size = '80px' }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      backgroundColor: '#DAD6FE',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 30px',
      overflow: 'hidden'
    }}
  >
    <img src={User} alt="User" style={{ width: `${parseInt(size) / 1.3}px`, height: `${parseInt(size) / 1.3}px` }} />
  </div>
);
