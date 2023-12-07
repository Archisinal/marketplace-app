import React, { FC } from 'react';
import { TIconProps } from './Icons.types';

const ArrowUp: FC<TIconProps> = ({ width = '12', height = '12' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.64645 2.14645C5.84171 1.95118 6.15829 1.95118 6.35355 2.14645L9.35355 5.14645C9.54882 5.34171 9.54882 5.65829 9.35355 5.85355C9.15829 6.04881 8.84171 6.04881 8.64645 5.85355L6.5 3.70711V9.5C6.5 9.77614 6.27614 10 6 10C5.72386 10 5.5 9.77614 5.5 9.5V3.70711L3.35355 5.85355C3.15829 6.04882 2.84171 6.04882 2.64645 5.85355C2.45118 5.65829 2.45118 5.34171 2.64645 5.14645L5.64645 2.14645Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ArrowUp;
