"use client";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

type TDescription = {
  value: string;
  maxLength?: number;
  className?: string;
};
const Description = ({ value, maxLength = 115, className }: TDescription) => {
  const isLonger = value.length > maxLength;
  const [expanded, setExpand] = useState(false);

  if (isLonger) {
    return (
      <div
        className={twMerge(
          `w-full mb-4 ${expanded ? "h-max" : "h-max"}`,
          className
        )}
      >
        {expanded && value}
        {!expanded && `${value.substring(0, maxLength)}...`}
        <span
          className="font-bold text-black dark:text-white w-max whitespace-nowrap pl-2 cursor-pointer"
          onClick={() => setExpand(!expanded)}
        >
          {expanded ? "Show less" : "Show more"}
        </span>
      </div>
    );
  }
  return <div className={twMerge("w-full h-max")}>{value}</div>;
};

export default Description;
