import React, { FC } from 'react';
import { TIconProps } from './Icons.types';

const Heart: FC<TIconProps> = ({
  width = '16',
  height = '17',
  color = 'white',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 17"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.1875 4.58325C3.90195 4.58325 2.75 5.73049 2.75 7.27055C2.75 8.23844 2.89591 8.88241 3.3754 9.57883C3.89041 10.3268 4.81596 11.1734 6.51102 12.4437L8 13.562L9.48837 12.4442C11.1834 11.1739 12.1096 10.3268 12.6246 9.57883C13.1041 8.88242 13.25 8.23845 13.25 7.27055C13.25 5.73049 12.0981 4.58325 10.8125 4.58325C10.0212 4.58325 9.28863 4.95621 8.6025 5.88175C8.46104 6.07257 8.23754 6.1851 8 6.1851C7.76246 6.1851 7.53897 6.07257 7.3975 5.88175C6.71137 4.95621 5.97882 4.58325 5.1875 4.58325ZM1.25 7.27055C1.25 5.00622 2.97305 3.08325 5.1875 3.08325C6.27177 3.08325 7.21128 3.51516 8 4.29097C8.78872 3.51516 9.72823 3.08325 10.8125 3.08325C13.0269 3.08325 14.75 5.00623 14.75 7.27055C14.75 8.43845 14.5626 9.40916 13.8601 10.4295C13.1932 11.3981 12.0882 12.3703 10.3888 13.6439C10.3887 13.6439 10.3889 13.6438 10.3888 13.6439L8.45039 15.0996C8.18357 15.3 7.81644 15.3 7.54961 15.0996L5.61146 13.644C3.91195 12.3704 2.80688 11.3982 2.13991 10.4295C1.43743 9.40916 1.25 8.43845 1.25 7.27055Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Heart;