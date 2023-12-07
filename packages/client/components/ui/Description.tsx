'use client';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type TDescription = {
  value: string;
  maxLength?: number;
  className?: string;
};
const Description = ({ value, maxLength = 115, className }: TDescription) => {
  const isLonger = value.length > maxLength;
  const [expanded, setExpand] = useState(false);

  if (isLonger) {
    return (
      <div
        className={twMerge(
          `mb-4 w-full ${expanded ? 'h-max' : 'h-max'}`,
          className,
        )}
      >
        {expanded && value}
        {!expanded && `${value.substring(0, maxLength)}...`}
        <span
          className="w-max cursor-pointer whitespace-nowrap pl-2 font-bold text-black dark:text-white"
          onClick={() => setExpand(!expanded)}
        >
          {expanded ? 'Show less' : 'Show more'}
        </span>
      </div>
    );
  }
  return <div className={twMerge('h-max w-full')}>{value}</div>;
};

export default Description;
