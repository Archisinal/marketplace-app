import React, { FC } from "react";
import { TIconProps } from "./Icons.types";

const Menu: FC<TIconProps> = ({ width = "23", height = "15" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 23 15"
      fill="none"
    >
      <rect width="23" height="3" rx="1.5" fill="black" />
      <rect y="6" width="23" height="3" rx="1.5" fill="black" />
      <rect y="12" width="23" height="3" rx="1.5" fill="black" />
    </svg>
  );
};

export default Menu;
