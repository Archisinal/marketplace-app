import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Icon, InputSearch } from '@/components';

type TDropDownSelect = {
  label?: string;
  disableSearch?: boolean;
  initValue?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  containerClass?: string;
  listContainerClass?: string;
  listItemClass?: string;
  inputContainerClass?: string;
  inputClass?: string;
  onSelect: (v: string) => void;
  suffix?: React.ReactNode;
};

const DropDownSelect = ({
  label,
  disableSearch,
  initValue = '',
  placeholder = 'Select an option',
  options,
  containerClass,
  listContainerClass,
  listItemClass,
  inputContainerClass,
  inputClass,
  onSelect,
  suffix,
}: TDropDownSelect) => {
  const [currenValue, setCurrentValue] = useState(initValue);
  const [expanded, setExpanded] = useState(false);

  const onSelectHandler = ({
    value,
    label,
  }: {
    value: string;
    label: string;
  }) => {
    setCurrentValue(label);
    onSelect && onSelect(value);
    setExpanded(false);
  };

  return (
    <div
      className={twMerge('flex cursor-pointer flex-col gap-3', containerClass)}
    >
      {label && <label>{label}</label>}
      <div className="relative">
        <InputSearch
          suffix={suffix || <Icon name="chevronDown" width="16" height="16" />}
          className={twMerge('px-3.5', inputContainerClass)}
          placeholder={placeholder}
          initValue={currenValue}
          onSuffixClick={() => setExpanded(!expanded)}
          disabled={disableSearch}
          inputClass={inputClass}
        />
        {expanded && (
          <ul
            className={twMerge(
              'absolute z-10 mt-0.5 flex w-full flex-col  gap-3 rounded-xl border bg-white py-3.5 dark:border-dark-gray dark:bg-dark-gray',
              listContainerClass,
            )}
          >
            {options.map(({ value, label }) => {
              return (
                <li
                  key={value}
                  className={twMerge(
                    'cursor-pointer px-3.5 hover:bg-light-silver',
                    listItemClass,
                  )}
                  onClick={() => onSelectHandler({ value, label })}
                >
                  {label}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DropDownSelect;
