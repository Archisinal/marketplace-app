import React, { useState, useMemo, useRef, ChangeEvent } from 'react';
import { Icon } from '@/components';
import { useOutsideClick } from '@/features/hooks/useOutsudeClick';

type TMultiSelect = {
  options: { id: string; label: string }[];
  onSelect: (id: string) => void;
  label: string;
  placeholder: string;
  onChange: (v: any[]) => void;
};

export const MultiSelect = ({
  options,
  onSelect,
  label,
  placeholder,
  onChange,
}: TMultiSelect) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedOptions, setOptions] = useState([]);
  const containerRef = useRef(null);

  useOutsideClick(containerRef, () => setExpanded(false));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const option = e.target.value;

    const selectedOptionSet = new Set(selectedOptions);

    if (isChecked) {
      // @ts-ignore
      selectedOptionSet.add(option);
    } else {
      // @ts-ignore
      selectedOptionSet.delete(option);
    }

    const newSelectedOptions = Array.from(selectedOptionSet);

    setOptions(newSelectedOptions);
    onChange(newSelectedOptions);
  };

  const value = useMemo(
    () =>
      !selectedOptions.length ? (
        <span className="text-txt-gray">{placeholder}</span>
      ) : (
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-3">
          {selectedOptions.map((option, i) => (
            <li
              key={`${option}-${i}`}
              className="flex items-center justify-between gap-1 rounded-xl bg-button-gray px-1.5 py-px dark:bg-dim-gray"
            >
              <span className="truncate">{option}</span>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setOptions(
                    selectedOptions.filter((label) => label !== option),
                  );
                }}
              >
                <Icon name="close" width="16" height="16" />
              </span>
            </li>
          ))}
        </ul>
      ),
    [selectedOptions],
  );

  return (
    <div className="relative" ref={containerRef}>
      <div
        className=" w-full rounded-2xl border p-3 dark:border-dark-gray dark:bg-dark-gray"
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        {value}
      </div>
      {expanded && (
        <ul className="absolute z-10 mt-2 w-full rounded-2xl border border-stroke-gray bg-white p-3 dark:border-dark-gray dark:bg-dark-gray">
          {options.map((option, i) => {
            const isSelected = selectedOptions.filter(
              (label) => label === option.label,
            ).length;
            return (
              <li key={i}>
                <label className="flex gap-3">
                  <input
                    type="checkbox"
                    onChange={handleChange}
                    value={option.label}
                    checked={!!isSelected}
                  />
                  <p>{option.label}</p>
                </label>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
