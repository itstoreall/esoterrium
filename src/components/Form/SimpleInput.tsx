type Props = {
  className?: string;
  type?: string;
  placeholder?: string;
  maxLength?: number;
  handleChange: (value: string) => void;
  isDisable?: boolean;
  isRequire?: boolean;
};

const SimpleInput = (props: Props) => {
  const {
    className,
    type = 'text',
    placeholder,
    maxLength = 320,
    handleChange,
    isDisable = false,
    isRequire = false,
  } = props;

  return (
    <div style={{ position: 'relative' }}>
      <input
        className={`simple-input ${className}`}
        type={type}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
        disabled={isDisable}
        required={isRequire}
      />
    </div>
  );
};

export default SimpleInput;
