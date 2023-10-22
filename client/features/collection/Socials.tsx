import React from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "@/components";

type TSocials = {
  className?: string;
  address?: string;
  mode?: "desktop" | "mobile";
};

const Socials = ({ className, address, mode }: TSocials) => {
  return (
    <div
      className={twMerge(
        "border border-stroke-gray dark:border-dark-gray rounded-2xl px-7 py-2.5 flex gap-8 text-black dark:text-white",
        className
      )}
    >
      <div className="flex items-center gap-2.5 cursor-pointer">
        <Icon name="globe" />
        {mode == "desktop" && <span>{address}</span>}
      </div>
      <span className="border-r border-stroke-gray dark:border-dark-gray"></span>
      <span className="cursor-pointer">
        <Icon name="twitter" />
      </span>
      <span className="border-r border-stroke-gray dark:border-dark-gray"></span>
      <span className="cursor-pointer">
        <Icon name="discord" />
      </span>
      <span className="border-r border-stroke-gray dark:border-dark-gray"></span>
      <span className="cursor-pointer">
        <Icon name="facebook" />
      </span>
    </div>
  );
};

export default Socials;
