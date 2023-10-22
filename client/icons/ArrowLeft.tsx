import React, { FC } from "react";
import { TIconProps } from "./Icons.types";

const ArrowLeft: FC<TIconProps> = ({ width = "16", height = "16" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.86383 3.46967C8.15672 3.76256 8.15672 4.23744 7.86383 4.53033L5.14416 7.25H12.6668C13.081 7.25 13.4168 7.58579 13.4168 8C13.4168 8.41421 13.081 8.75 12.6668 8.75H5.14416L7.86383 11.4697C8.15672 11.7626 8.15672 12.2374 7.86383 12.5303C7.57093 12.8232 7.09606 12.8232 6.80317 12.5303L2.80317 8.53033C2.51027 8.23744 2.51027 7.76256 2.80317 7.46967L6.80317 3.46967C7.09606 3.17678 7.57093 3.17678 7.86383 3.46967Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ArrowLeft;
