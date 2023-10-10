import React, { FC } from "react";
import { TIconProps } from "./Icons.types";

const ChevronUp: FC<TIconProps> = ({ width = "20", height = "20" }) => (
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
      d="M9.29289 7.14644C9.68342 6.75591 10.3166 6.75592 10.7071 7.14644L15.5303 11.9697C15.8232 12.2626 15.8232 12.7374 15.5303 13.0303C15.2374 13.3232 14.7626 13.3232 14.4697 13.0303L10 8.56065L5.53033 13.0303C5.23744 13.3232 4.76256 13.3232 4.46967 13.0303C4.17678 12.7374 4.17678 12.2626 4.46967 11.9697L9.29289 7.14644Z"
      fill="currentColor"
    />
  </svg>
);

export default ChevronUp;
