import React, { FC } from 'react';
import { TIconProps } from './Icons.types';

const ArrowRightUp: FC<TIconProps> = ({
  width = '16',
  height = '16',
  ...rest
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.893 4.7002C4.893 4.28598 5.22879 3.9502 5.643 3.9502H11.3097C11.7239 3.9502 12.0597 4.28598 12.0597 4.7002V10.3669C12.0597 10.7811 11.7239 11.1169 11.3097 11.1169C10.8955 11.1169 10.5597 10.7811 10.5597 10.3669V6.50104L5.23053 11.8302C4.93763 12.1231 4.46276 12.1231 4.16987 11.8302C3.87697 11.5373 3.87697 11.0624 4.16987 10.7695L9.4892 5.4502H5.643C5.22879 5.4502 4.893 5.11441 4.893 4.7002Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ArrowRightUp;
