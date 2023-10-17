"use client";
import React, { FC, ReactNode, Ref, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type TInputSearch = {
  suffix?: ReactNode;
  prefix?: ReactNode;
  placeholder?: string;
  value?: string;
  styles?: string;
};

export const InputSearch = forwardRef<HTMLInputElement, TInputSearch>(
  ({ prefix, suffix, placeholder, styles }, ref) => {
    return (
      <div
        className={twMerge(
          "dark:bg-dark-gray dark:border-transparent flex border flex py-2.5 px-6 rounded-2xl grow justify-between",
          styles
        )}
      >
        {prefix && <div className="self-center pr-3.5">{prefix}</div>}
        <input
          ref={ref}
          type="text"
          className="border-none bg-transparent outline-none w-full placeholder:text-raven"
          placeholder={placeholder || "Type here"}
        />
        {suffix && <div className="self-center">{suffix}</div>}
      </div>
    );
  }
);
