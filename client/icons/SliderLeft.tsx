import React, { FC } from "react";
import { TIconProps } from "./Icons.types";

const SliderLeft: FC<TIconProps> = ({ width = "59", height = "59" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 59 59"
    fill="none"
  >
    <g filter="url(#filter0_d_635_5510)">
      <rect
        width="39"
        height="39"
        rx="19.5"
        transform="matrix(-1 0 0 1 49 10)"
        fill="white"
      />
      <path d="M32 24L27 29.5L32 35" stroke="black" />
    </g>
    <defs>
      <filter
        id="filter0_d_635_5510"
        x="0"
        y="0"
        width="59"
        height="59"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_635_5510"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_635_5510"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default SliderLeft;
