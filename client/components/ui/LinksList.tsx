"use client";

import React, { FC } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type TListConfig = {
  config: { label: string; onClick?: () => void }[];
};

export const defaultConfig = [
  { label: "Explore", onClick: () => {} },
  { label: "Create" },
  { label: "Sell" },
  { label: "About us" },
];
export const LinksList: FC<TListConfig> = ({ config = defaultConfig }) => {
  return (
    <div>
      <ul className="flex gap-10 font-semibold items-center h-full">
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
    </div>
  );
};
