"use client";
import React, { FC, ElementType, useState } from "react";
import { Icon } from "..";

type TDropDown = {
  label: string;
  Component: ElementType;
};

const DropDown: FC<TDropDown> = ({ label, Component }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="flex justify-between border-y  border-stroke-gray dark:border-dark-gray p-5">
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

export default DropDown;
