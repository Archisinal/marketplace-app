import React, { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type TMultiButton = {
  title?: string | ReactNode;
  suffix?: ReactNode;
  prefix?: ReactNode;
  styles?: string;
  onClick?: () => void;
};

export const MultiButton: FC<TMultiButton> = ({
  title,
  suffix,
  prefix,
  styles,
  onClick,
}) => {
  return (
    <div
      className={twMerge(
        "cursor-pointer justify-center dark:bg-dark-gray bg-white-smoke bg-button-gray dark:bg-dark-gray flex items-center gap-2",
        styles
      )}
      onClick={onClick}
    >
      {prefix && <span>{prefix}</span>}
      {title && <p>{title}</p>}
      {suffix && <span>{suffix}</span>}
    </div>
  );
};
