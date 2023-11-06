"use client";
import React, { ReactNode, forwardRef, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "..";

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
      type = "text",
      onChange,
      initValue = "",
      onSuffixClick,
      disabled,
      onClear,
      noCleaarIcon = false,
      inputClass,
    },
    ref
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
      setValue("");
    };

    useEffect(() => {
      setValue(initValue);
    }, [initValue]);

    return (
      <div
        className={twMerge(
          "dark:bg-dark-gray dark:border-transparent flex border flex py-2.5 px-6 rounded-2xl grow justify-between relative focus-within:border-silver dark:focus-within:border-vulcan",
          className
        )}
      >
        {prefix && <div className="self-center pr-3.5">{prefix}</div>}
        <input
          onChange={onChangeHandler}
          value={inputValue}
          ref={ref}
          type={type}
          className={twMerge(
            "border-none bg-transparent outline-none w-full placeholder:text-raven",
            inputClass
          )}
          placeholder={placeholder || "Type here"}
          disabled={disabled}
        />
        {!noCleaarIcon && (
          <span
            className={twMerge(
              "flex items-center",
              !disabled && inputValue ? "flex" : "hidden"
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
  }
);
