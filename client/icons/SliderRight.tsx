import React, { FC } from "react";
import { TIconProps } from "./Icons.types";

const SliderRight: FC<TIconProps> = ({
  width = "59",
  height = "59",
  color = "white",
}) => {
  const styles = {
    white: {
      path: "black",
      rect: "white",
    },
    black: {
      path: "white",
      rect: "black",
    },
  } as { [key: string]: any };

  const { path, rect } = styles[color];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 59 59"
      fill="none"
    >
      <g filter="url(#filter0_d_579_11605)">
        <rect x="10" y="10" width="39" height="39" rx="19.5" fill={rect} />
        <path d="M27 24L32 29.5L27 35" stroke={path} />
      </g>
      <defs>
        <filter
          id="filter0_d_579_11605"
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
            result="effect1_dropShadow_579_11605"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_579_11605"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default SliderRight;
