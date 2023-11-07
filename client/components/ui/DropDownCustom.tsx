"use client";
import React, { FC, ElementType, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "..";

type TDropDown = {
  label: string;
  Component: ElementType;
  className?: string;
};

const DropDownCustom: FC<TDropDown> = ({ label, Component, className }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div
        className={twMerge(
          "flex justify-between border-y  border-stroke-gray dark:border-vulcan p-5",
          className
        )}
      >
        <p className="text-lg font-semibold ">{label}</p>
        <span onClick={() => setOpen(!open)} className="cursor-pointer">
          <Icon
            name={open ? "chevronUp" : "chevronDown"}
            width="20"
            height="20"
          />
        </span>
      </div>
      {open && (
        <div>
          <Component />
        </div>
      )}
    </div>
  );
};

export default DropDownCustom;
