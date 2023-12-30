import React, { FC } from 'react';
import { TIconProps } from './Icons.types';

const ArrowDown: FC<TIconProps> = ({
  width = '12',
  height = '12',
  ...rest
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 2C6.27614 2 6.5 2.22386 6.5 2.5V8.29289L8.64645 6.14645C8.84171 5.95118 9.15829 5.95118 9.35355 6.14645C9.54882 6.34171 9.54882 6.65829 9.35355 6.85355L6.35355 9.85355C6.25978 9.94732 6.13261 10 6 10C5.86739 10 5.74021 9.94732 5.64645 9.85355L2.64645 6.85355C2.45118 6.65829 2.45118 6.34171 2.64645 6.14645C2.84171 5.95118 3.15829 5.95118 3.35355 6.14645L5.5 8.29289V2.5C5.5 2.22386 5.72386 2 6 2Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ArrowDown;
