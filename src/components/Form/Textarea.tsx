type Props = {
  className?:
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

  return (
    <textarea
      className={`default-textarea ${className}`}
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
