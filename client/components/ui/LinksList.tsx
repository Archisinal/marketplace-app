"use client";

import React, { FC } from "react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { motion } from "framer-motion";

type TListConfig = {
  config: { label: string; onClick?: () => void }[];
  className?: string;
};

export const defaultConfig = [
  { label: "Explore", onClick: () => {} },
  { label: "Create" },
  { label: "Sell" },
  { label: "About us" },
];
export const LinksList: FC<TListConfig> = ({
  config = defaultConfig,
  className,
}) => {
  return (
    <ul
      className={twMerge(
        "flex gap-10 font-semibold items-center h-full",
        className
      )}
    >
      {config.map(({ label, onClick }, i) => (
        <motion.li
          key={i}
          onClick={onClick}
          className="cursor-pointer"
          whileHover={{ opacity: 0.5 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link href="/explore">{label}</Link>
        </motion.li>
      ))}
    </ul>
  );
};
