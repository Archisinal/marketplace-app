import React, { useState, useMemo, useRef, ChangeEvent } from 'react';
import { Icon } from '@/components';
import { useOutsideClick } from '@/features/hooks/useOutsudeClick';
import { AnimatePresence, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

type TOption = { id: string; label: string };
type TMultiSelect = {
  options: TOption[];
  label: string;
  placeholder: string;
  onChange: (v: any[]) => void;
  selectedCategories?: string[];
  errorMessage?: string | boolean;
};

export const MultiSelect = ({
  options,
  placeholder,
  onChange,
  selectedCategories,
  errorMessage,
}: TMultiSelect) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedOptions, setOptions] = useState(selectedCategories || []);
  const containerRef = useRef(null);
  const [currentOptions, setCurrentOptions] = useState<TOption[]>(options);
  const errorClasses = 'border-danger dark:border-danger-light';

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
              className="flex cursor-default flex-wrap items-center gap-1 rounded-xl bg-button-gray px-2 dark:bg-dim-gray"
            >
              <span className="truncate">{option}</span>
              <span onClick={unSelectOption(option)}>
                <Icon
                  name="close"
                  width="16"
                  height="16"
                  className="cursor-pointer transition hover:opacity-50"
                />
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
        className={twMerge(
          'flex w-full cursor-pointer items-center justify-between rounded-2xl border p-3 dark:border-dark-gray dark:bg-dark-gray',
          expanded && 'border-silver dark:border-vulcan',
          errorMessage && errorClasses,
        )}
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <div className="flex-1">{value}</div>
        {expanded ? (
          <Icon name="chevronUp" width="20" height="20" className="w-10" />
        ) : (
          <Icon name="chevronDown" width="20" height="20" className="w-10" />
        )}
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.ul
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 5, opacity: 0 }}
            className="absolute z-10 mt-2 flex w-full flex-col overflow-hidden rounded-2xl border border-silver bg-white dark:border-vulcan dark:bg-dark-gray"
          >
            {currentOptions.map((option, i) => {
              const isSelected = selectedOptions.filter(
                (label) => label === option.label,
              ).length;
              return (
                <li key={i} className="hover:bg-silver dark:hover:bg-vulcan">
                  <label className="flex cursor-pointer gap-3 px-3 py-2">
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
            {currentOptions.length === 0 && (
              <li className="px-3 py-2 text-txt-gray">No options available</li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
      {errorMessage && <p className="mt-3 text-danger-light">{errorMessage}</p>}
    </div>
  );
};
