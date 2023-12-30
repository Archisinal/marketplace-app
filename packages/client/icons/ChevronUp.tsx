import React, { FC } from 'react';
import { TIconProps } from './Icons.types';

const ChevronUp: FC<TIconProps> = ({
  width = '12',
  height = '12',
  ...rest
}) => (
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
      d="M5.46967 4.32322C5.76256 4.03033 6.23744 4.03033 6.53033 4.32322L9.35355 7.14645C9.54882 7.34171 9.54882 7.65829 9.35355 7.85355C9.15829 8.04882 8.84171 8.04882 8.64645 7.85355L6 5.20711L3.35355 7.85355C3.15829 8.04882 2.84171 8.04882 2.64645 7.85355C2.45118 7.65829 2.45118 7.34171 2.64645 7.14645L5.46967 4.32322Z"
      fill="currentColor"
    />
  </svg>
);

export default ChevronUp;
