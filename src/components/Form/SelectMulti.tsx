/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { FiChevronUp } from 'react-icons/fi';
import { GoAlert } from 'react-icons/go';

type Props = {
  className?:
    | 'admin-all-users-info-list-item-content-value-select'
    | 'article-create-form-select light-select-theme'
    | 'article-edit-form-select light-select-theme';
  options: string[];
  initialOption?: string | null;
  onSelect: (selectedOption: string) => void;
  placeholder?: string;
  isDisable?: boolean;
  isReset?: boolean;
  isError?: boolean;
  isOpen: boolean;
  onToggle: () => void;
};

const SelectMulti = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const {
    className,
    placeholder,
    options,
    initialOption,
    isOpen,
    onToggle,
    onSelect,
    isDisable,
    isError,
    isReset,
  } = props;

  useEffect(() => {
    if (initialOption) setSelectedOption(initialOption);
  }, [initialOption]);

  useEffect(() => {
    if (isReset) {
      console.log('Resetting to:', initialOption);
      setSelectedOption(initialOption || null);
    }
  }, [isReset, initialOption]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    onToggle();
  };

  const handleOpen = () => {
    if (!isDisable) {
      onToggle();
    }
  };

  // ---

  const optionSelectedStyle = selectedOption ? 'option-selected' : '';

  return (
    <div className={`default-select ${className}`}>
      {!isDisable ? (
        <>
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
          {isError && (
            <GoAlert size={25} className="default-select-error-icon" />
          )}
        </>
      ) : (
        <span className={`default-select-selected-disable`}>{placeholder}</span>
      )}
    </div>
  );
};

export default SelectMulti;
