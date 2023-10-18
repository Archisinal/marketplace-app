import React, { FC } from "react";
import { TIconProps } from "./Icons.types";

const Discord: FC<TIconProps> = ({
  width = "20",
  height = "21",
  className,
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 21"
      fill="none"
    >
      <g clipPath="url(#clip0_635_1947)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.5026 3.83337C13.1229 3.83337 13.7771 4.04983 14.3778 4.28892L14.817 4.46944C15.8669 4.90949 16.457 5.83234 16.9146 6.84682C17.6569 8.49236 18.1723 10.6865 18.3508 12.3547C18.4356 13.1472 18.457 13.9435 18.304 14.479C18.1404 15.0514 17.5813 15.4565 17.0389 15.7753L16.771 15.9279L16.4923 16.0822C16.3489 16.1623 16.2019 16.2418 16.0551 16.3193L15.6198 16.5444L15.0227 16.8421L14.542 17.0787C14.1304 17.2845 13.6298 17.1177 13.424 16.706C13.2181 16.2944 13.385 15.7939 13.7966 15.588L14.4558 15.2632L13.972 14.756C12.8138 15.2315 11.4491 15.5 10.0001 15.5C8.55104 15.5 7.18637 15.2315 6.02819 14.756L5.54517 15.2624L6.2061 15.588C6.61774 15.7939 6.7846 16.2944 6.57877 16.706C6.37295 17.1177 5.87239 17.2845 5.46074 17.0787L5.00772 16.854C4.67213 16.688 4.33659 16.5221 4.00483 16.3488L3.23175 15.9279L2.96385 15.7753C2.42146 15.4565 1.86235 15.0514 1.6988 14.479C1.54582 13.9435 1.56713 13.1472 1.65193 12.3547C1.83042 10.6865 2.34584 8.49236 3.0881 6.84682C3.5457 5.83235 4.13584 4.90949 5.18578 4.46944C5.88257 4.17741 6.72647 3.83337 7.50007 3.83337C8.00257 3.83337 8.39729 4.29607 8.32443 4.78943C8.86387 4.709 9.42496 4.66671 10.0001 4.66671C10.5762 4.66671 11.1381 4.70913 11.6784 4.78982C11.6053 4.29635 12 3.83337 12.5026 3.83337ZM7.29176 9.25004C6.48634 9.25004 5.83342 9.90296 5.83342 10.7084C5.83342 11.5138 6.48634 12.1667 7.29176 12.1667C8.09717 12.1667 8.75012 11.5138 8.75012 10.7084C8.75012 9.90296 8.09717 9.25004 7.29176 9.25004ZM12.7085 9.25004C11.903 9.25004 11.2501 9.90296 11.2501 10.7084C11.2501 11.5138 11.903 12.1667 12.7085 12.1667C13.5139 12.1667 14.1668 11.5138 14.1668 10.7084C14.1668 9.90296 13.5139 9.25004 12.7085 9.25004Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_635_1947">
          <rect
            width="20"
            height="20"
            fill="currentColor"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Discord;
