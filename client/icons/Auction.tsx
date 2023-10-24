import React, { FC } from "react";
import { TIconProps } from "./Icons.types";

const Auction: FC<TIconProps> = ({
  width = "37",
  height = "37",
  color = "black",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 37 37"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.5 6.16659C11.6885 6.16659 6.16671 11.6884 6.16671 18.4999C6.16671 25.3114 11.6885 30.8333 18.5 30.8333C25.3116 30.8333 30.8334 25.3114 30.8334 18.4999C30.8334 11.6884 25.3116 6.16659 18.5 6.16659ZM3.08337 18.4999C3.08337 9.98553 9.98565 3.08325 18.5 3.08325C27.0144 3.08325 33.9167 9.98553 33.9167 18.4999C33.9167 27.0143 27.0144 33.9166 18.5 33.9166C9.98565 33.9166 3.08337 27.0143 3.08337 18.4999ZM18.2355 10.4175C19.087 10.4175 19.7772 11.1077 19.7772 11.9592V19.6169L25.2145 21.6839C26.0104 21.9864 26.4103 22.8769 26.1078 23.6727C25.8052 24.4686 24.9148 24.8685 24.1189 24.566L17.6877 22.1212C17.0894 21.8938 16.6939 21.3203 16.6939 20.6802V11.9592C16.6939 11.1077 17.3841 10.4175 18.2355 10.4175Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Auction;
