'use client';

import { useRouter } from 'next/navigation';

type ButtonProps = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  type?: 'submit' | 'button';
  title?: string;
  clickContent?: (() => void) | string;
  isDisable?: boolean;
};

const Button = (props: ButtonProps) => {
  const {
    children = 'Submit',
    style,
    className,
    type = 'submit',
    title,
    clickContent,
    isDisable,
  } = props;

  const router = useRouter();

  const onClickHandler = () => {
    if (typeof clickContent === 'function') {
      clickContent();
    } else if (typeof clickContent === 'string') {
      router.push(clickContent);
    } else return;
  };

  const disableStyle = isDisable ? 'disabled' : '';
  const btnStyle = `button ${className || ''} ${disableStyle}`;

  return (
    <>
      {isDisable ? (
        <span className={btnStyle}>
          <span className="button-text">{children}</span>
        </span>
      ) : (
        <button
          style={{ cursor: 'pointer', ...style }}
          className={btnStyle}
          type={type}
          title={title}
          onClick={() => onClickHandler()}
          disabled={isDisable}
        >
          <span className="button-text">{children}</span>
        </button>
      )}
    </>
  );
};

export default Button;
