import React, { FC } from 'react';
import { TIconProps } from './Icons.types';

const Tag: FC<TIconProps> = ({
  width = '37',
  height = '37',
  color = 'black',
  ...rest
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 37 37"
      fill="none"
      {...rest}
    >
      <path
        d="M12.3333 13.8751C13.1848 13.8751 13.875 13.1848 13.875 12.3334C13.875 11.4819 13.1848 10.7917 12.3333 10.7917C11.4819 10.7917 10.7917 11.4819 10.7917 12.3334C10.7917 13.1848 11.4819 13.8751 12.3333 13.8751Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.7235 3.32533C17.9533 3.18025 17.1598 3.24166 16.0813 3.32512L11.5771 3.67165C10.5092 3.75378 9.62914 3.82146 8.91101 3.93291C8.16333 4.04894 7.48874 4.22576 6.85563 4.5791C5.90037 5.11222 5.11215 5.90043 4.57903 6.85569C4.2257 7.4888 4.04888 8.16339 3.93285 8.91107C3.8214 9.6292 3.75372 10.5092 3.67159 11.5771L3.32506 16.0814C3.2416 17.1599 3.18019 17.9533 3.32527 18.7235C3.44797 19.3749 3.67955 20.0009 4.01029 20.5753C4.40138 21.2545 4.9644 21.817 5.72962 22.5815L13.4481 30.2999C14.2425 31.0944 14.8936 31.7455 15.4645 32.236C16.0554 32.7437 16.6438 33.1546 17.3367 33.4068C18.6401 33.8812 20.0689 33.8812 21.3723 33.4068C22.0652 33.1546 22.6536 32.7437 23.2445 32.236C23.8153 31.7456 24.4664 31.0945 25.2608 30.3L30.2998 25.261C31.0943 24.4665 31.7455 23.8154 32.236 23.2445C32.7437 22.6536 33.1545 22.0653 33.4067 21.3724C33.8811 20.069 33.8811 18.6401 33.4067 17.3367C33.1545 16.6438 32.7437 16.0555 32.236 15.4646C31.7455 14.8937 31.0943 14.2426 30.2998 13.4481L22.5815 5.72967C21.817 4.96445 21.2545 4.40143 20.5753 4.01036C20.0009 3.67961 19.3748 3.44803 18.7235 3.32533ZM16.1295 6.10467C17.4423 6.00368 17.8459 5.98382 18.2098 6.05237C18.5548 6.11736 18.8863 6.24001 19.1906 6.41518C19.5115 6.59997 19.805 6.87767 20.736 7.80874L28.2998 15.3725C29.1413 16.2141 29.7173 16.7913 30.1312 17.273C30.5356 17.7437 30.7091 18.0387 30.7991 18.2858C31.0503 18.9762 31.0503 19.7329 30.7991 20.4233C30.7091 20.6704 30.5356 20.9654 30.1312 21.4361C29.7173 21.9178 29.1413 22.495 28.2998 23.3366L23.3366 28.2998C22.495 29.1414 21.9177 29.7173 21.436 30.1312C20.9653 30.5357 20.6703 30.7092 20.4232 30.7991C19.7329 31.0504 18.9761 31.0504 18.2858 30.7991C18.0386 30.7092 17.7437 30.5357 17.273 30.1312C16.7912 29.7173 16.214 29.1414 15.3724 28.2998L7.80868 20.7361C6.87761 19.805 6.59991 19.5115 6.41512 19.1906C6.23995 18.8864 6.1173 18.5548 6.05231 18.2098C5.98376 17.8459 6.00362 17.4424 6.1046 16.1295L6.4343 11.8435C6.52158 10.7088 6.58198 9.93617 6.67502 9.33663C6.76534 8.75467 6.87274 8.44003 7.00221 8.20804C7.28457 7.7021 7.70204 7.28463 8.20798 7.00227C8.43997 6.8728 8.75461 6.7654 9.33657 6.67509C9.93611 6.58204 10.7087 6.52164 11.8434 6.43436L16.1295 6.10467Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Tag;
