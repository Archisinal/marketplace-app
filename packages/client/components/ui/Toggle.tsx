'use client';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

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
    <div className={twMerge('flex items-center gap-2', containerClass)}>
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          value=""
          className="peer sr-only outline-none "
          checked={checked}
          onChange={changeHandler}
        />
        <div className="peer h-6 w-11 rounded-full border border-stroke-gray  bg-white outline-none after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-black after:transition-all after:content-[''] peer-checked:bg-black peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:after:bg-white dark:border-gray-600 dark:bg-dark-gray dark:after:bg-white dark:peer-checked:bg-dark-gray dark:peer-checked:after:bg-golden-tainoi "></div>
      </label>
    </div>
  );
};

export default Toggle;
