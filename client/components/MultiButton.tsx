import React, { FC, ReactNode } from "react";

type TMultiButton = {
  title?: string;
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
      className={`${styles} justify-center dark:bg-dark-gray bg-white-smoke bg-button-gray dark:bg-dark-gray flex items-center gap-2`}
      onClick={onClick}
    >
      {prefix && <span>{prefix}</span>}
      {title && <p>{title}</p>}
      {suffix && <span>{suffix}</span>}
    </div>
  );
};
