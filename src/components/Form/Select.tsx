import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { FiChevronUp } from 'react-icons/fi';

interface Props {
  options: string[];
  onSelect: (selectedOption: string) => void;
  placeholder?: string;
  className?: string;
}

const Select = ({ options, onSelect, placeholder, className }: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={`default-select ${className}`}>
      <div
        className="default-select-selected"
        onClick={() => setIsOpen((prev) => !prev)}
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
    </div>
  );
};

export default Select;
