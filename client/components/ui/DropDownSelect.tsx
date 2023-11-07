import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { InputSearch, Icon } from "@/components";

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
  initValue = "",
  placeholder = "Select an option",
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
      className={twMerge("flex flex-col gap-3 cursor-pointer", containerClass)}
    >
      {label && <label>{label}</label>}
      <div className="relative">
        <InputSearch
          suffix={suffix || <Icon name="chevronDown" width="16" height="16" />}
          className={twMerge("px-3.5", inputContainerClass)}
          placeholder={placeholder}
          initValue={currenValue}
          onSuffixClick={() => setExpanded(!expanded)}
          disabled={disableSearch}
          inputClass={inputClass}
        />
        {expanded && (
          <ul
            className={twMerge(
              "z-10 py-3.5 border dark:border-dark-gray rounded-xl absolute  w-full bg-white dark:bg-dark-gray mt-0.5 flex flex-col gap-3",
              listContainerClass
            )}
          >
            {options.map(({ value, label }) => {
              return (
                <li
                  className={twMerge(
                    "cursor-pointer hover:bg-light-silver px-3.5",
                    listItemClass
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
