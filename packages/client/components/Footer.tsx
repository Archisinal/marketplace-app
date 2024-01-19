import React from 'react';

export const Footer = () => {
  return (
    <>
      <div className="mx-4 mt-11 flex flex-col items-center justify-center gap-2.5 border-t py-4 dark:border-dark-gray sm:mx-0 sm:flex-row sm:gap-6">
        <p className="dark:text-dolphin sm:text-xs">©Archisinal, Inc.</p>
        <div className="flex gap-7 text-xs dark:text-dolphin">
          <span className="cursor-pointer">Community guidelines</span>
          <span className="cursor-pointer">Terms</span>
          <span className="cursor-pointer">Privacy policy</span>
        </div>
      </div>
    </>
  );
};
