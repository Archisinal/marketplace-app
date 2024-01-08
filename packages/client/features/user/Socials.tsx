import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Icon } from '@/components';
import { TIconNames } from '@/icons/Icons.types';

type TSocials = {
  className?: string;
  address?: string;
  mode?: 'desktop' | 'mobile';
  options: string[];
};

const Socials = ({ className, options }: TSocials) => {
  return (
    <div
      className={twMerge(
        'flex gap-8 rounded-2xl border border-stroke-gray px-7 py-2.5 text-black dark:border-dark-gray dark:text-white',
        className,
      )}
    >
      {options.map((option, index) => {
        return (
          <>
            <span className="cursor-pointer">
              <Icon name={option as TIconNames} />
            </span>
            {index !== options.length - 1 && (
              <span className="border-r border-stroke-gray dark:border-dark-gray"></span>
            )}
          </>
        );
      })}
    </div>
  );
};

export default Socials;
