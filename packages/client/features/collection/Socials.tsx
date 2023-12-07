import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Icon } from '@/components';

type TSocials = {
  className?: string;
  address?: string;
  mode?: 'desktop' | 'mobile';
};

const Socials = ({ className, address, mode }: TSocials) => {
  return (
    <div
      className={twMerge(
        'flex gap-8 rounded-2xl border border-stroke-gray px-7 py-2.5 text-black dark:border-dark-gray dark:text-white',
        className,
      )}
    >
      <div className="flex cursor-pointer items-center gap-2.5">
        <Icon name="globe" />
        {mode == 'desktop' && <span>{address}</span>}
      </div>
      <span className="border-r border-stroke-gray dark:border-dark-gray"></span>
      <span className="cursor-pointer">
        <Icon name="twitter" />
      </span>
      <span className="border-r border-stroke-gray dark:border-dark-gray"></span>
      <span className="cursor-pointer">
        <Icon name="discord" />
      </span>
      <span className="border-r border-stroke-gray dark:border-dark-gray"></span>
      <span className="cursor-pointer">
        <Icon name="facebook" />
      </span>
    </div>
  );
};

export default Socials;
