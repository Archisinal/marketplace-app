import React, { useState, useMemo, useRef, ChangeEvent } from 'react';
import { Icon } from '@/components';
import { useOutsideClick } from '@/features/hooks/useOutsudeClick';

type TOption = { id: string; label: string };
type TMultiSelect = {
  options: TOption[];
  label: string;
  placeholder: string;
  onChange: (v: any[]) => void;
  selectedCategories?: string[];
};

export const MultiSelect = ({
  options,
  placeholder,
  onChange,
  selectedCategories,
}: TMultiSelect) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedOptions, setOptions] = useState(selectedCategories || []);
  const containerRef = useRef(null);
  const [currentOptions, setCurrentOptions] = useState<TOption[]>(options);

  useOutsideClick(containerRef, () => setExpanded(false));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const option = e.target.value;
    const selectedOptionSet = new Set(selectedOptions);
    if (isChecked) {
      // @ts-ignore
      selectedOptionSet.add(option);
    }
    const newSelectedOptions = Array.from(selectedOptionSet);
    const newCurrentOptions = currentOptions.filter(
      ({ label }) => label !== option,
    );
    setOptions(newSelectedOptions);
    setCurrentOptions(newCurrentOptions);
    onChange(newSelectedOptions);
  };

  const unSelectOption =
    (option: string) => (e: React.MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation();
      const newSelectedOptions = selectedOptions.filter(
        (label) => label !== option,
      );
      setOptions(newSelectedOptions);
      onChange(newSelectedOptions);
      const unselectedOption = options.find(({ label }) => label == option);
      if (unselectedOption) {
        setCurrentOptions((prev) => prev.concat(unselectedOption));
      }
    };

  const value = useMemo(
    () =>
      !selectedOptions.length ? (
        <span className="text-placeholder">{placeholder}</span>
      ) : (
        <ul className="flex flex-wrap gap-1">
          {selectedOptions.map((option, i) => (
            <li
              key={`${option}-${i}`}
              className="flex flex-wrap items-center gap-1 rounded-xl bg-button-gray px-1.5 py-px dark:bg-dim-gray"
            >
              <span className="truncate">{option}</span>
              <span onClick={unSelectOption(option)}>
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
      {currentOptions?.length > 0 && expanded && (
        <ul className="absolute z-10 mt-2 flex w-full flex-col gap-1 rounded-2xl border border-stroke-gray bg-white p-3 dark:border-dark-gray dark:bg-dark-gray">
          {currentOptions.map((option, i) => {
            const isSelected = selectedOptions.filter(
              (label) => label === option.label,
            ).length;
            return (
              <li key={i}>
                <label className="flex cursor-pointer gap-3 hover:opacity-50">
                  <p>{option.label}</p>
                  <input
                    type="checkbox"
                    onChange={handleChange}
                    value={option.label}
                    checked={!!isSelected}
                    className="invisible"
                  />
                </label>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
