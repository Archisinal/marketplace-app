import { twMerge } from 'tailwind-merge';
import React from 'react';

const TextField = ({
  className,
  errorMessage,
  endowment,
  disabled,
  ...rest
}: {
  className?: string;
  errorMessage?: string | boolean;
  endowment?: React.ReactNode;
  disabled?: boolean;
  [x: string]: any;
}) => {
  const errorClasses = 'border-danger dark:border-danger-light';
  const normalClasses =
    'border-stroke-gray dark:border-dark-gray dark:focus:border-vulcan focus:border-silver';
  const endowmentClasses = 'rounded-r-none';
  const disabledClasses = 'bg-light-gray dark:bg-black-font text-txt-gray';
  return (
    <>
      <div className="flex items-stretch">
        <input
          className={twMerge(
            'w-full rounded-2xl border bg-white p-3 px-4 outline-none dark:bg-dark-gray',
            errorMessage ? errorClasses : normalClasses,
            endowment && endowmentClasses,
            disabled && disabledClasses,
            className,
          )}
          disabled={disabled}
          {...rest}
        />
        {endowment && (
          <div className="flex items-center rounded-r-2xl border border-l-0 border-stroke-gray bg-white px-4 dark:border-dark-gray dark:bg-dark-gray dark:focus:border-vulcan">
            <span className="text-txt-gray">{endowment}</span>
          </div>
        )}
      </div>
      {errorMessage && <p className="text-danger-light">{errorMessage}</p>}
    </>
  );
};

export default TextField;
