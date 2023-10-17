import React, { FC } from "react";
import { TIconProps } from "./Icons.types";

const Basket: FC<TIconProps> = ({
  width = "30",
  height = "30",
  color = "black",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill="none"
    >
      <path
        d="M11.25 12.5C11.25 13.1904 10.6904 13.75 10 13.75C9.30965 13.75 8.75 13.1904 8.75 12.5C8.75 11.8096 9.30965 11.25 10 11.25C10.6904 11.25 11.25 11.8096 11.25 12.5Z"
        fill="currentColor"
      />
      <path
        d="M20 13.75C20.6903 13.75 21.25 13.1904 21.25 12.5C21.25 11.8096 20.6903 11.25 20 11.25C19.3096 11.25 18.75 11.8096 18.75 12.5C18.75 13.1904 19.3096 13.75 20 13.75Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.88626 7.62497C9.08004 4.41688 11.7432 1.875 15 1.875C18.2568 1.875 20.9199 4.41688 21.1137 7.62497L21.4216 7.62497C22.0246 7.62495 22.5448 7.62493 22.9731 7.66049C23.4252 7.69804 23.8746 7.78097 24.3058 8.00495C24.9222 8.32515 25.4248 8.82776 25.745 9.44418C25.969 9.87536 26.0519 10.3248 26.0895 10.7769C26.125 11.2051 26.125 11.7253 26.125 12.3284V17.804C26.125 19.0437 26.125 20.0437 26.0578 20.853C25.9886 21.6865 25.8423 22.4179 25.4917 23.0929C24.958 24.1203 24.1203 24.958 23.093 25.4917C22.418 25.8423 21.6865 25.9886 20.8531 26.0578C20.0438 26.125 19.0438 26.125 17.8041 26.125H12.196C10.9563 26.125 9.95622 26.125 9.14693 26.0578C8.31352 25.9886 7.58203 25.8423 6.90702 25.4917C5.87965 24.958 5.04198 24.1203 4.5083 23.0929C4.15766 22.4179 4.0114 21.6865 3.94219 20.853C3.87498 20.0437 3.87499 19.0437 3.875 17.804L3.875 12.3284C3.87498 11.7253 3.87496 11.2051 3.91053 10.7769C3.94807 10.3248 4.031 9.87536 4.25498 9.44418C4.57519 8.82776 5.07779 8.32515 5.69421 8.00495C6.12539 7.78097 6.57479 7.69804 7.02692 7.66049C7.45516 7.62493 7.97537 7.62495 8.5784 7.62497L8.88626 7.62497ZM11.1429 7.62497C11.3315 5.66083 12.9864 4.125 15 4.125C17.0136 4.125 18.6684 5.66083 18.8571 7.62497H11.1429ZM6.73141 10.0016C6.78789 9.97229 6.90266 9.92856 7.21313 9.90277C7.53706 9.87587 7.96294 9.87497 8.6225 9.87497H21.3775C22.0371 9.87497 22.4629 9.87587 22.7869 9.90277C23.0973 9.92856 23.2121 9.97229 23.2686 10.0016C23.4741 10.1084 23.6416 10.2759 23.7483 10.4814C23.7777 10.5379 23.8214 10.6526 23.8472 10.9631C23.8741 11.287 23.875 11.7129 23.875 12.3725V17.755C23.875 19.0552 23.8741 19.9616 23.8155 20.6668C23.7581 21.3586 23.651 21.7554 23.495 22.0558C23.1748 22.6722 22.6722 23.1748 22.0558 23.495C21.7555 23.651 21.3586 23.7581 20.6669 23.8155C19.9616 23.8741 19.0552 23.875 17.755 23.875H12.245C10.9448 23.875 10.0384 23.8741 9.33314 23.8155C8.64138 23.7581 8.24453 23.651 7.94421 23.495C7.32779 23.1748 6.82519 22.6722 6.50498 22.0558C6.34898 21.7554 6.24192 21.3586 6.18447 20.6668C6.12591 19.9616 6.125 19.0552 6.125 17.755V12.3725C6.125 11.7129 6.12591 11.287 6.15281 10.9631C6.17859 10.6526 6.22232 10.5379 6.25166 10.4814C6.3584 10.2759 6.52593 10.1084 6.73141 10.0016Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Basket;
