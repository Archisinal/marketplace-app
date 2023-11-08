import React, { FC, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

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
        'flex cursor-pointer items-center justify-center gap-2 bg-button-gray bg-white-smoke dark:bg-dark-gray dark:bg-dark-gray',
        styles,
      )}
      onClick={onClick}
    >
      {prefix && <span>{prefix}</span>}
      {title && <p>{title}</p>}
      {suffix && <span>{suffix}</span>}
    </div>
  );
};
