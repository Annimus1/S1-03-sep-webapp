import Ojo from '../../../../assets/icons/Ojo.svg';

export const StatusIcon = ({ type = 'eye' }) => {
  if (type === 'eye') {
    return (
        <img src={Ojo} alt="Ojo" style={{ width: '30px', height: '30px' }} />
    );
  }
  return null;
};