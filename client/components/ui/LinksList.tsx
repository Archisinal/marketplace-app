'use client';

import React, { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import { motion } from 'framer-motion';

type TListConfig = {
  config: { label: string; onClick?: () => void; path: string }[];
  className?: string;
};

export const defaultConfig = [
  {
    label: 'Explore',
    path: '/explore',
  },
  { label: 'Create', path: '/explore/nft/createNft' },
  { label: 'Sell', path: '/' },
  { label: 'About us', path: '/' },
];
export const LinksList: FC<TListConfig> = ({
  config = defaultConfig,
  className,
}) => {
  return (
    <ul
      className={twMerge(
        'flex h-full items-center gap-10 font-semibold',
        className,
      )}
    >
      {config.map(({ label, path }, i) => (
        <motion.li
          key={i}
          className="cursor-pointer"
          transition={{ duration: 0.2 }}
          whileHover={{ opacity: 0.5 }}
        >
          <Link href={path} prefetch={false}>
            {label}
          </Link>
        </motion.li>
      ))}
    </ul>
  );
};
