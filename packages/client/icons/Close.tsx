import React, { FC } from 'react';
import { TIconProps } from './Icons.types';

const Close: FC<TIconProps> = ({ width = '28', height = '28' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 28 28"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.29289 6.29289C6.68342 5.90237 7.31658 5.90237 7.70711 6.29289L14 12.5858L20.2929 6.29289C20.6834 5.90237 21.3166 5.90237 21.7071 6.29289C22.0976 6.68342 22.0976 7.31658 21.7071 7.70711L15.4142 14L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L14 15.4142L7.70711 21.7071C7.31658 22.0976 6.68342 22.0976 6.29289 21.7071C5.90237 21.3166 5.90237 20.6834 6.29289 20.2929L12.5858 14L6.29289 7.70711C5.90237 7.31658 5.90237 6.68342 6.29289 6.29289Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Close;
