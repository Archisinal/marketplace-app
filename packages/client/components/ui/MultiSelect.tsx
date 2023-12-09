import React, { useState, useMemo, useRef } from 'react';
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

  const handleChange = (e) => {
    const isChecked = e.target.checked;
    const option = e.target.value;

    const selectedOptionSet = new Set(selectedOptions);

    if (isChecked) {
      selectedOptionSet.add(option);
    } else {
      selectedOptionSet.delete(option);
    }

    const newSelectedOptions = Array.from(selectedOptionSet);

    setOptions(newSelectedOptions);
    onChange(newSelectedOptions);
  };

  const value = useMemo(
    () =>
      !selectedOptions.length ? (
        placeholder
      ) : (
        <ul className="grid grid-cols-3 gap-2">
          {selectedOptions.map((option, i) => (
            <li
              key={`${option}-${i}`}
              className="flex items-center justify-between gap-1 rounded-xl bg-sky-500 px-1.5 py-px"
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
        className=" w-full rounded-2xl border p-2"
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        {value}
      </div>
      {expanded && (
        <ul className="absolute z-10 w-full border border-amber-400 bg-dark-gray p-2">
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
