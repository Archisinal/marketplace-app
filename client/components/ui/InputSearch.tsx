"use client";
import React, { FC, ReactNode, Ref, forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type TInputSearch = {
  suffix?: ReactNode;
  prefix?: ReactNode;
  onChange?: (value: any) => void;
  placeholder?: string;
  value?: string;
  initValue?: string;
  className?: string;
  type?: string;
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
      initValue,
    },
    ref
  ) => {
    const [inputValue, setValue] = useState(initValue || "");

    const onChangeHandler = ({
      target: { value },
    }: React.ChangeEvent<HTMLInputElement>) => {
      setValue(value);
      onChange && onChange(value);
    };

    return (
      <div
        className={twMerge(
          "dark:bg-dark-gray dark:border-transparent flex border flex py-2.5 px-6 rounded-2xl grow justify-between",
          className
        )}
      >
        {prefix && <div className="self-center pr-3.5">{prefix}</div>}
        <input
          onChange={onChangeHandler}
          value={inputValue}
          ref={ref}
          type={type}
          className="border-none bg-transparent outline-none w-full placeholder:text-raven"
          placeholder={placeholder || "Type here"}
        />
        {suffix && <div className="self-center">{suffix}</div>}
      </div>
    );
  }
);
