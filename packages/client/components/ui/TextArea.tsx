import { twMerge } from 'tailwind-merge';
import React from 'react';

const TextArea = ({
  className,
  errorMessage,
  ...rest
}: {
  className?: string;
  errorMessage?: string | boolean;
  [x: string]: any;
}) => {
  const errorClasses = 'border-danger dark:border-danger-light';
  const normalClasses = 'border-stroke-gray dark:border-dark-gray';
  return (
    <>
      <textarea
        className={twMerge(
          'rounded-2xl border p-3 outline-none focus:border-silver dark:bg-dark-gray dark:focus:border-vulcan',
          errorMessage ? errorClasses : normalClasses,
          className,
        )}
        {...rest}
      />
      {errorMessage && <p className="text-danger-light">{errorMessage}</p>}
    </>
  );
};

export default TextArea;
