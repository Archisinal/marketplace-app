import React, { FC } from "react";
import { TIconProps } from "./Icons.types";

const ChevronDown: FC<TIconProps> = ({ width = "20", height = "20" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.46967 6.96967C4.76256 6.67678 5.23744 6.67678 5.53033 6.96967L10 11.4393L14.4697 6.96967C14.7626 6.67678 15.2374 6.67678 15.5303 6.96967C15.8232 7.26256 15.8232 7.73744 15.5303 8.03033L10.7071 12.8536C10.3166 13.2441 9.68342 13.2441 9.29289 12.8536L4.46967 8.03033C4.17678 7.73744 4.17678 7.26256 4.46967 6.96967Z"
      fill="currentColor"
    />
  </svg>
);

export default ChevronDown;
