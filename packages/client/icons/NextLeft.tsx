import React, { FC } from 'react';
import { TIconProps } from './Icons.types';

const NextLeft: FC<TIconProps> = ({ width = '12', height = '12' }) => {
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
        d="M7.85358 2.64645C8.04884 2.84171 8.04884 3.15829 7.85358 3.35355L5.20713 6L7.85358 8.64645C8.04884 8.84171 8.04884 9.15829 7.85358 9.35355C7.65831 9.54882 7.34173 9.54882 7.14647 9.35355L4.32325 6.53033C4.03035 6.23744 4.03035 5.76256 4.32325 5.46967L7.14647 2.64645C7.34173 2.45118 7.65831 2.45118 7.85358 2.64645Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default NextLeft;
