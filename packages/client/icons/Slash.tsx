import React, { FC } from 'react';
import { TIconProps } from './Icons.types';

const Slash: FC<TIconProps> = ({
  width = '25',
  height = '26',
  color = '#38393D',
  ...rest
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 25 26"
      fill="none"
      {...rest}
    >
      <rect width="25" height="26" rx="6" fill={color} />
      <path d="M14.8 7H16L11.2 19H10L14.8 7Z" fill="#5D5E62" />
    </svg>
  );
};

export default Slash;
