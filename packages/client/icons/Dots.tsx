import React, { FC } from 'react';
import { TIconProps } from './Icons.types';

const Dots: FC<TIconProps> = ({ width = '18', height = '5', ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 18 5"
      fill="none"
      {...rest}
    >
      <circle cx="2" cy="2.5" r="2" fill="currentColor" />
      <circle cx="9" cy="2.5" r="2" fill="currentColor" />
      <circle cx="16" cy="2.5" r="2" fill="currentColor" />
    </svg>
  );
};

export default Dots;
