import React, { FC } from "react";
import { TIconProps } from "./Icons.types";

const ArrowRight: FC<TIconProps> = ({ width = "15", height = "12" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 15 12"
      fill="none"
    >
      <path
        d="M9.79591 11.4602L9.79585 11.4602C9.71634 11.3839 9.70407 11.232 9.78119 11.1383L13.1659 7.02643L13.839 6.20867H12.7798H1.55371C1.5029 6.20867 1.39746 6.15211 1.39746 6.00001C1.39746 5.8479 1.5029 5.79134 1.55371 5.79134H12.7798H13.839L13.1659 4.97358L9.78119 0.861711L9.78118 0.861698C9.70411 0.768072 9.71628 0.616152 9.7959 0.53973C9.83022 0.506796 9.86449 0.498447 9.89248 0.500225C9.92074 0.50202 9.9568 0.515204 9.99009 0.555637L14.3456 5.84692C14.3456 5.84693 14.3457 5.84693 14.3457 5.84694C14.4147 5.93088 14.4147 6.06913 14.3457 6.15307C14.3457 6.15308 14.3456 6.15309 14.3456 6.15309L9.99008 11.4444C9.95682 11.4848 9.92078 11.498 9.89254 11.4998C9.86456 11.5016 9.83025 11.4932 9.79591 11.4602Z"
        fill="currentColor"
        stroke="currentColor"
      />
    </svg>
  );
};

export default ArrowRight;