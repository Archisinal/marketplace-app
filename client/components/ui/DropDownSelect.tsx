import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { InputSearch, Icon } from "@/components";

type TDropDownSelect = {
  label: string;
  initValue?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  containerClass?: string;
  listItemClass?: string;
  onSelect: (v: string) => void;
};

const DropDownSelect = ({
  label,
  initValue = "",
  placeholder = "Select an option",
  options,
  containerClass,
  listItemClass,
  onSelect,
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
    <div className={twMerge("flex flex-col gap-3", containerClass)}>
      <label>{label}</label>
      <div className="relative">
        <InputSearch
          suffix={<Icon name="chevronDown" width="20" height="20" />}
          className="px-3.5"
          placeholder={placeholder}
          initValue={currenValue}
          onSuffixClick={() => setExpanded(!expanded)}
        />
        {expanded && (
          <ul className="z-10 py-3.5 border dark:border-dark-gray rounded-xl absolute  w-full bg-white dark:bg-dark-gray mt-0.5 flex flex-col gap-3">
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
