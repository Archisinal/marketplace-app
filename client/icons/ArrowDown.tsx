import React, { FC } from "react";
import { TIconProps } from "./Icons.types";

const ArrowDown: FC<TIconProps> = ({ width = "7", height = "4" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 7 4"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.885808 0.312949C1.07079 0.117689 1.37072 0.117689 1.5557 0.312949L3.74708 2.62604L5.93847 0.312949C6.12346 0.117689 6.42334 0.117689 6.60833 0.312949C6.79332 0.508209 6.79332 0.824769 6.60833 1.02004L4.082 3.6867C3.89701 3.88197 3.59714 3.88197 3.41215 3.6867L0.885808 1.02004C0.700824 0.824769 0.700824 0.508209 0.885808 0.312949Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ArrowDown;
