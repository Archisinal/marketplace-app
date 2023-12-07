'use client';

import React, { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

type TListConfig = {
  config: { label: string; onClick: () => void }[];
  className?: string;
};

export const LinksList: FC<TListConfig> = ({ config, className }) => {
  return (
    <ul
      className={twMerge(
        'flex h-full items-center gap-10 font-semibold',
        className,
      )}
    >
      {config.map(({ label, onClick }, i) => (
        <motion.li
          key={i}
          className="cursor-pointer"
          transition={{ duration: 0.2 }}
          whileHover={{ opacity: 0.5 }}
        >
          <span onClick={() => onClick()}>{label}</span>
        </motion.li>
      ))}
    </ul>
  );
};
