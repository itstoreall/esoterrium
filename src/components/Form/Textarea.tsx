import { useEffect, useRef } from 'react';

type Props = {
  className?:
    | 'article-create-form-textarea'
    | 'article-edit-form-textarea'
    | 'article-details-comments-add-form-textarea'
    | 'article-details-comments-edit-form-textarea';
  placeholder?: string;
  value: string;
  maxLength?: number;
  handleChangeValue: (val: string) => void;
  required?: boolean;
  isAutoFocus?: boolean;
  isDisable?: boolean;
};

const Textarea = (props: Props) => {
  const {
    className,
    placeholder = '',
    value,
    maxLength,
    handleChangeValue,
    required = true,
    isAutoFocus = false,
    isDisable = false,
  } = props;

  const taRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    if (taRef.current) {
      taRef.current.style.height = 'auto'; // Reset to auto
      taRef.current.style.height = `${taRef.current.scrollHeight}px`; // Scroll height
    }
  };

  useEffect(() => {
    const isCreateArticle = className === 'article-create-form-textarea';
    const isEditArticle = className === 'article-edit-form-textarea';
    if (!isCreateArticle && !isEditArticle) return;
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
      disabled={isDisable}
    />
  );
};

export default Textarea;
