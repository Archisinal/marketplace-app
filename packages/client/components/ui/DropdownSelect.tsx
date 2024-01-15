import React, { useState, useMemo, useRef, ChangeEvent } from 'react';
import { Icon } from '@/components';
import { useOutsideClick } from '@/features/hooks/useOutsudeClick';
import { AnimatePresence, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export type TDropdownSelectOption = { value: any; label: string };
type TMultiSelect = {
  options: TDropdownSelectOption[];
  multiple?: boolean;
  label: string;
  placeholder: string;
  onChange: (v: TDropdownSelectOption[]) => void;
  value?: TDropdownSelectOption[];
  errorMessage?: string | boolean;
  endowment?: string | 0;
};

export const DropdownSelect = ({
  multiple = false,
  options,
  placeholder,
  onChange,
  value = [],
  errorMessage,
  endowment,
}: TMultiSelect) => {
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef(null);
  const [currentOptions, setCurrentOptions] =
    useState<TDropdownSelectOption[]>(options);
  const errorClasses = 'border-danger dark:border-danger-light';

  useOutsideClick(containerRef, () => setExpanded(false));

  const handleChange = (option: TDropdownSelectOption) => {
    const newCurrentOptions = multiple
      ? currentOptions.filter(({ value }) => value !== option.value)
      : options.filter(({ value }) => value !== option.value);

    if (!multiple) {
      setExpanded(false);
    }

    setCurrentOptions(newCurrentOptions);
    onChange(multiple ? [...value, option] : [option]);
  };

  const unSelectOption =
    (option: string) => (e: React.MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation();

      onChange(value.filter(({ value }) => value !== option));
      const unselectedOption = options.find(({ value }) => value == option);
      if (unselectedOption) {
        setCurrentOptions((prev) => prev.concat(unselectedOption));
      }
    };

  const MultipleValue = () =>
    !value.length ? (
      <span className="text-placeholder">{placeholder}</span>
    ) : (
      <ul className="flex flex-wrap gap-1">
        {value.map(({ label, value }) => (
          <li
            key={value}
            className="flex cursor-default flex-wrap items-center gap-1 rounded-xl bg-button-gray px-2 dark:bg-dim-gray"
          >
            <span className="truncate">{label}</span>
            <span onClick={unSelectOption(value)}>
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
        <div className="flex-1">
          {multiple ? (
            <MultipleValue />
          ) : (
            value[0]?.label || (
              <span className="text-placeholder">{placeholder}</span>
            )
          )}
        </div>
        <div className="flex gap-1">
          {endowment && <span className="text-txt-gray">{endowment}</span>}
          {expanded ? (
            <Icon name="chevronUp" width="20" height="20" className="w-10" />
          ) : (
            <Icon name="chevronDown" width="20" height="20" className="w-10" />
          )}
        </div>
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
              return (
                <li
                  key={i}
                  className="hover:bg-silver dark:hover:bg-vulcan"
                  onClick={() => handleChange(option)}
                >
                  <label className="flex cursor-pointer gap-3 px-3 py-2">
                    <p>{option.label}</p>
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
