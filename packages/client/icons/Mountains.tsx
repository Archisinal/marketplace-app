import React, { FC } from 'react';
import { TIconProps } from './Icons.types';

const Mountains: FC<TIconProps> = ({
  width = '22',
  height = '22',
  ...rest
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 22 22"
      fill="none"
      {...rest}
    >
      <mask
        id="mask0_581_16556"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="22"
        height="22"
      >
        <path
          d="M16.9801 0H5C2.23858 0 0 2.23858 0 5V17C0 19.7614 2.23857 22 4.99999 22L16.9325 22C19.6862 22 21.9215 19.7735 21.9325 17.0198L21.9801 5.01984C21.9911 2.25069 19.7493 0 16.9801 0Z"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_581_16556)">
        <path
          d="M5 0.5H16.9801C19.4724 0.5 21.49 2.52562 21.4801 5.01786L21.4325 17.0179C21.4226 19.4962 19.4108 21.5 16.9325 21.5L4.99999 21.5C2.51471 21.5 0.5 19.4853 0.5 17V5C0.5 2.51472 2.51472 0.5 5 0.5Z"
          stroke="white"
        />
        <path
          d="M0 22L19.3794 22C20.7924 22 21.9513 20.8804 22 19.4683L18.8185 15.7565C18.0154 14.8196 16.5639 14.8263 15.7695 15.7705L13.5618 18.3948C13.1196 18.9205 12.2912 18.854 11.9385 18.2645L8.0138 11.7055C7.23472 10.4035 5.34633 10.4092 4.57516 11.7159L1.28677 17.2879C0.444346 18.7153 0 20.3425 0 22Z"
          fill="#E2E2E2"
        />
        <path
          d="M0 22L19.3794 22C20.7924 22 21.9513 20.8804 22 19.4683L18.8185 15.7565C18.0154 14.8196 16.5639 14.8263 15.7695 15.7705L13.5618 18.3948C13.1196 18.9205 12.2912 18.854 11.9385 18.2645L8.0138 11.7055C7.23472 10.4035 5.34633 10.4092 4.57516 11.7159L1.28677 17.2879C0.444346 18.7153 0 20.3425 0 22Z"
          fill="white"
        />
        <circle cx="15.2308" cy="6.76924" r="2.53846" fill="white" />
      </g>
    </svg>
  );
};

export default Mountains;
