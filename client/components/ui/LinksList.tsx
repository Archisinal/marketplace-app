"use client";

import React, { FC } from "react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { motion } from "framer-motion";

type TListConfig = {
  config: { label: string; onClick?: () => void; path: string }[];
  className?: string;
};

export const defaultConfig = [
  { label: "Explore", onClick: () => {}, path: "/explore" },
  { label: "Create", path: "/explore/nft/createNft" },
  { label: "Sell", path: "/" },
  { label: "About us", path: "/" },
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
      {config.map(({ label, onClick, path }, i) => (
        <motion.li
          key={i}
          onClick={onClick}
          className="cursor-pointer"
          transition={{ duration: 0.2 }}
          whileHover={{ opacity: 0.5 }}
        >
          <Link href={path}>{label}</Link>
        </motion.li>
      ))}
    </ul>
  );
};
