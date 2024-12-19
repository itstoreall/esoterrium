type Props = {
  className?: string;
  type?: string;
  placeholder?: string;
  value: string;
  handleChange: (value: string) => void;
  maxLength?: number;
  isDisable?: boolean;
  isRequire?: boolean;
};

const SimpleInput = (props: Props) => {
  const {
    className,
    type = 'text',
    placeholder,
    value,
    handleChange,
    maxLength = 320,
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
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        disabled={isDisable}
        required={isRequire}
      />
    </div>
  );
};

export default SimpleInput;
