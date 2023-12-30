import React, { FC } from 'react';
import { TIconProps } from './Icons.types';

const ChevronDown: FC<TIconProps> = ({
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
        d="M2.64645 4.14645C2.84171 3.95118 3.15829 3.95118 3.35355 4.14645L6 6.79289L8.64645 4.14645C8.84171 3.95118 9.15829 3.95118 9.35355 4.14645C9.54882 4.34171 9.54882 4.65829 9.35355 4.85355L6.53033 7.67678C6.23744 7.96967 5.76256 7.96967 5.46967 7.67678L2.64645 4.85355C2.45118 4.65829 2.45118 4.34171 2.64645 4.14645Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ChevronDown;
