import React, { FC, ReactNode } from "react";

type TInputSearch = {
  suffix?: ReactNode;
  prefix?: ReactNode;
  placeholder: string;
};

export const InputSearch: FC<TInputSearch> = ({
  prefix,
  suffix,
  placeholder,
}) => {
  return (
    <div className="dark:bg-dark-gray dark:border-transparent flex border flex p-2.5 rounded-2xl grow justify-between">
      {prefix && <div>{prefix}</div>}
      <input
        type="text"
        className="border-none bg-transparent outline-none"
        placeholder={placeholder || "Type here"}
      />
      {suffix && <div className="self-center">{suffix}</div>}
    </div>
  );
};
