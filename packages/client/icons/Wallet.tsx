import React, { FC } from 'react';
import { TIconProps } from './Icons.types';

const Wallet: FC<TIconProps> = ({ width = '24', height = '24' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 22"
      fill="none"
    >
      <path
        d="M0 4.125C0 1.84683 1.79087 0 4 0H20C22.2092 0 24 1.84683 24 4.125V17.875C24 20.1532 22.2092 22 20 22H4C1.79087 22 0 20.1532 0 17.875V4.125Z"
        fill="white"
      />
      <path
        d="M18.667 6.875H24.0003V15.125H18.667C16.4578 15.125 14.667 13.2782 14.667 11C14.667 8.72176 16.4578 6.875 18.667 6.875Z"
        fill="#534AF3"
      />
      <path
        d="M21.3337 11C21.3337 11.7594 20.7367 12.375 20.0003 12.375C19.2639 12.375 18.667 11.7594 18.667 11C18.667 10.2406 19.2639 9.625 20.0003 9.625C20.7367 9.625 21.3337 10.2406 21.3337 11Z"
        fill="white"
      />
    </svg>
  );
};

export default Wallet;
