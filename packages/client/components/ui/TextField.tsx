import { twMerge } from 'tailwind-merge';
import React from 'react';

const TextField = ({
  className,
  errorMessage,
  endowment,
  ...rest
}: {
  className?: string;
  errorMessage?: string | boolean;
  endowment?: React.ReactNode;
  [x: string]: any;
}) => {
  const errorClasses = 'border-danger dark:border-danger-light';
  const normalClasses = 'border-stroke-gray dark:border-dark-gray';
  const endowmentClasses = 'rounded-r-none';
  return (
    <>
      <div className="flex items-center">
        <input
          className={twMerge(
            'w-full rounded-2xl border p-3 px-4 outline-none focus:border-silver dark:bg-dark-gray dark:focus:border-vulcan',
            errorMessage ? errorClasses : normalClasses,
            endowment && endowmentClasses,
            className,
          )}
          {...rest}
        />
        {endowment && (
          <div className="h-full rounded-r-2xl p-3 px-4 focus:border-silver dark:bg-dark-gray dark:focus:border-vulcan">
            <span className="text-txt-gray">{endowment}</span>
          </div>
        )}
      </div>
      {errorMessage && <p className="text-danger-light">{errorMessage}</p>}
    </>
  );
};

export default TextField;
