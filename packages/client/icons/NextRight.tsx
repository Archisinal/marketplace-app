import React, { FC } from 'react';
import { TIconProps } from './Icons.types';

const NextRight: FC<TIconProps> = ({
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
        d="M4.14648 2.64645C3.95122 2.84171 3.95122 3.15829 4.14648 3.35355L6.79293 6L4.14648 8.64645C3.95122 8.84171 3.95122 9.15829 4.14648 9.35355C4.34175 9.54882 4.65833 9.54882 4.85359 9.35355L7.67681 6.53033C7.96971 6.23744 7.96971 5.76256 7.67681 5.46967L4.85359 2.64645C4.65833 2.45118 4.34175 2.45118 4.14648 2.64645Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default NextRight;
