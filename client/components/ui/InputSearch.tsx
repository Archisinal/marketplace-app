'use client';
import React, { forwardRef, ReactNode, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Icon } from '..';
import { motion } from 'framer-motion';

type TInputSearch = {
  suffix?: ReactNode;
  prefix?: ReactNode;
  onChange?: (value: any) => void;
  placeholder?: string;
  value?: string;
  initValue?: string | number;
  className?: string;
  type?: string;
  disabled?: boolean;
  onClear?: () => void;
  onSuffixClick?: () => void;
  noCleaarIcon?: boolean;
  inputClass?: string;
};

export const InputSearch = forwardRef<HTMLInputElement, TInputSearch>(
  (
    {
      prefix,
      suffix,
      placeholder,
      className,
      type = 'text',
      onChange,
      initValue = '',
      onSuffixClick,
      disabled,
      onClear,
      noCleaarIcon = false,
      inputClass,
    },
    ref,
  ) => {
    const [inputValue, setValue] = useState(initValue);

    const onChangeHandler = ({
      target: { value },
    }: React.ChangeEvent<HTMLInputElement>) => {
      setValue(value);
      onChange && onChange(value);
    };

    const onClearHandler = () => {
      if (onClear) {
        onClear();
      }
      setValue('');
    };

    useEffect(() => {
      setValue(initValue);
    }, [initValue]);

    return (
      <div
        className={twMerge(
          'relative flex grow cursor-pointer justify-between rounded-2xl border px-6 py-2.5 focus-within:border-silver dark:border-transparent dark:bg-dark-gray dark:focus-within:border-vulcan dark:focus-within:bg-transparent',
          className,
        )}
      >
        {prefix && <div className="self-center pr-3.5">{prefix}</div>}
        <input
          onChange={onChangeHandler}
          value={inputValue}
          ref={ref}
          type={type}
          className={twMerge(
            'w-full border-none bg-transparent outline-none placeholder:text-raven',
            inputClass,
          )}
          placeholder={placeholder || 'Type here'}
          disabled={disabled}
        />
        {!noCleaarIcon && (
          <span
            className={twMerge(
              'flex items-center',
              !disabled && inputValue ? 'flex' : 'hidden',
            )}
            onClick={onClearHandler}
          >
            <Icon name="close" width="16" height="16" />
          </span>
        )}
        {suffix && (
          <div
            className="self-center"
            onClick={onSuffixClick ? onSuffixClick : () => {}}
          >
            {suffix}
          </div>
        )}
      </div>
    );
  },
);

InputSearch.displayName = 'InputSearch';
