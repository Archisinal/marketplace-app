"use client";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

type TToggle = {
  containerClass?: string;
  initValue?: boolean;
  onChange: (v: boolean) => void;
};
const Toggle = ({ containerClass, initValue, onChange }: TToggle) => {
  const [checked, setChecked] = useState(initValue);

  const changeHandler = () => {
    onChange && onChange(!checked);
    setChecked(!checked);
  };

  return (
    <div className={twMerge("flex items-center gap-2", containerClass)}>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer outline-none "
          checked={checked}
          onChange={changeHandler}
        />
        <div className="w-11 h-6 bg-white border border-stroke-gray outline-none  rounded-full peer dark:bg-dark-gray peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-black dark:after:bg-white peer-checked:after:bg-white dark:peer-checked:after:bg-golden-tainoi after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black dark:peer-checked:bg-dark-gray "></div>
      </label>
    </div>
  );
};

export default Toggle;
