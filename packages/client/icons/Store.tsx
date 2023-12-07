import React, { FC } from 'react';
import { TIconProps } from './Icons.types';

const Store: FC<TIconProps> = ({ width = '22', height = '22' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 22 22"
      fill="none"
    >
      <path
        d="M0 2.75C0 1.23122 1.23122 0 2.75 0H6.67856C8.19735 0 9.42851 1.23122 9.42851 2.75V6.67858C9.42851 8.19736 8.19735 9.42853 6.67856 9.42853H2.75C1.23122 9.42853 0 8.19736 0 6.67858V2.75Z"
        fill="white"
        fillOpacity="0.4"
      />
      <path
        d="M12.5713 2.75C12.5713 1.23122 13.8025 0 15.3213 0H19.2498C20.7686 0 21.9998 1.23122 21.9998 2.75V6.67858C21.9998 8.19736 20.7686 9.42853 19.2498 9.42853H15.3213C13.8025 9.42853 12.5713 8.19736 12.5713 6.67858V2.75Z"
        fill="white"
      />
      <path
        d="M12.5713 15.3215C12.5713 13.8027 13.8025 12.5715 15.3213 12.5715H19.2498C20.7686 12.5715 21.9998 13.8027 21.9998 15.3215V19.2501C21.9998 20.7689 20.7686 22.0001 19.2498 22.0001H15.3213C13.8025 22.0001 12.5713 20.7689 12.5713 19.2501V15.3215Z"
        fill="white"
      />
      <path
        d="M0 15.3214C0 13.8026 1.23122 12.5714 2.75 12.5714H6.67856C8.19735 12.5714 9.42851 13.8026 9.42851 15.3214V19.2499C9.42851 20.7688 8.19735 21.9999 6.67856 21.9999H2.75C1.23122 21.9999 0 20.7688 0 19.2499V15.3214Z"
        fill="white"
      />
    </svg>
  );
};

export default Store;
