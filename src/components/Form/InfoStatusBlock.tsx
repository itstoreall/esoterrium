import ConfirmCircleFilledIcon from '@/src/assets/animation/ConfirmCircleFilledIcon';
import ErrorCircleFilledIcon from '@/src/assets/animation/ErrorCircleFilledIcon';
import WarningTriangleIcon from '@/src/assets/animation/WarningTriangleIcon';

type Props = {
  text?: string;
  status?: 'success' | 'error' | 'warning';
  className?: string;
};

const InfoStatusBlock = (props: Props) => {
  const { text, status, className } = props;

  const icon =
    status === 'success' ? (
      <ConfirmCircleFilledIcon />
    ) : status === 'error' ? (
      <ErrorCircleFilledIcon />
    ) : (
      <WarningTriangleIcon />
    );

  const statusText =
    status === 'success'
      ? 'Отправлено'
      : status === 'error'
      ? 'Ошибка'
      : 'Внимание';

  return (
    <div className={`info-status-block ${status} ${className}`}>
      {icon}
      {status && (
        <span className="info-status-block-title">{`${statusText}!`}</span>
      )}
      {text && <p className="info-status-block-text">{text}</p>}
    </div>
  );
};

export default InfoStatusBlock;

/*
import { RxExclamationTriangle,RxExclamationTriangle } from 'react-icons/rx';
<RxCheckCircled className="info-status-block-icon" size={'4rem'} />
<RxExclamationTriangle className="info-status-block-icon" size={'4rem'} />
*/
