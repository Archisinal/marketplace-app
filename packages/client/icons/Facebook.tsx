import React, { FC } from 'react';
import { TIconProps } from './Icons.types';

const Facebook: FC<TIconProps> = ({ width = '20', height = '21' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 21"
      fill="none"
    >
      <g clipPath="url(#clip0_635_1954)">
        <path
          d="M11.2498 18.7402C15.2593 18.137 18.3332 14.6775 18.3332 10.5C18.3332 5.89758 14.6022 2.16663 9.99984 2.16663C5.39746 2.16663 1.6665 5.89758 1.6665 10.5C1.6665 14.6775 4.74045 18.137 8.74984 18.7402V13H7.49984C6.80948 13 6.24984 12.4403 6.24984 11.75C6.24984 11.0596 6.80948 10.5 7.49984 10.5H8.74984V8.83329C8.74984 7.22246 10.0557 5.91663 11.6665 5.91663H12.0832C12.7735 5.91663 13.3332 6.47627 13.3332 7.16663C13.3332 7.85698 12.7735 8.41663 12.0832 8.41663H11.6665C11.4364 8.41663 11.2498 8.60318 11.2498 8.83329V10.5H12.4998C13.1902 10.5 13.7498 11.0596 13.7498 11.75C13.7498 12.4403 13.1902 13 12.4998 13H11.2498V18.7402Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_635_1954">
          <rect
            width="20"
            height="20"
            fill="currentColor"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Facebook;
