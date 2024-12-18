import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { FiChevronUp } from 'react-icons/fi';
import { GoAlert } from 'react-icons/go';

interface Props {
  className?: string;
  options: string[];
  onSelect: (selectedOption: string) => void;
  placeholder?: string;
  isError?: boolean;
}

const Select = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { className, options, onSelect, placeholder, isError } = props;

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const handleOpen = () => setIsOpen((prev) => !prev);

  // ---

  const optionSelectedStyle = selectedOption ? 'option-selected' : '';

  return (
    <div className={`default-select ${className}`}>
      <div
        className={`default-select-selected ${optionSelectedStyle}`}
        onClick={handleOpen}
      >
        <span>{selectedOption || placeholder}</span>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      {isOpen && (
        <ul className="default-select-option-list">
          {options.map((option) => (
            <li
              key={option}
              className="default-select-option-list-item"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
      {isError && <GoAlert size={25} className="default-select-error-icon" />}
    </div>
  );
};

export default Select;
