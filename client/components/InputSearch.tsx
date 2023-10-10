import React, { FC, ReactNode } from "react";

type TInputSearch = {
  suffix?: ReactNode;
  prefix?: ReactNode;
  placeholder?: string;
  value?: string;
  styles?: string;
};

export const InputSearch: FC<TInputSearch> = ({
  prefix,
  suffix,
  placeholder,
  styles,
}) => {
  return (
    <div
      className={`${styles} dark:bg-dark-gray dark:border-transparent flex border flex p-2.5 rounded-2xl grow justify-between`}
    >
      {prefix && <div className="self-center pr-3.5">{prefix}</div>}
      <input
        type="text"
        className="border-none bg-transparent outline-none w-full"
        placeholder={placeholder || "Type here"}
      />
      {suffix && <div className="self-center">{suffix}</div>}
    </div>
  );
};
