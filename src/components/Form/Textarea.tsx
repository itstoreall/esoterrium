import { useEffect, useRef } from 'react';

type Props = {
  className?:
    | 'article-create-form-textarea'
    | 'article-details-comments-add-form-textarea'
    | 'article-details-comments-edit-form-textarea';
  placeholder?: string;
  value: string;
  maxLength?: number;
  handleChangeValue: (val: string) => void;
  required?: boolean;
  isAutoFocus?: boolean;
};

const Textarea = (props: Props) => {
  const {
    className,
    placeholder = '',
    value,
    maxLength = 3500,
    handleChangeValue,
    required = true,
    isAutoFocus = false,
  } = props;

  const taRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    if (taRef.current) {
      taRef.current.style.height = 'auto'; // Reset to auto
      taRef.current.style.height = `${taRef.current.scrollHeight}px`; // Scroll height
    }
  };

  useEffect(() => {
    if (className !== 'article-create-form-textarea') return;
    adjustHeight();
  }, [value, className]);

  return (
    <textarea
      className={`default-textarea ${className}`}
      ref={taRef}
      placeholder={placeholder}
      value={value}
      onChange={(e) => handleChangeValue(e.target.value)}
      maxLength={maxLength}
      required={required}
      autoFocus={isAutoFocus}
    />
  );
};

export default Textarea;
