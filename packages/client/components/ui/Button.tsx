'use client';
import React, { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

type TButton = {
  title: string | React.ReactNode;
  color?: 'black' | 'white' | 'transparent' | 'transparent-white' | 'silver';
  onClick?: () => void;
  className?: string;
};

export const Button: FC<TButton> = ({
  title,
  onClick = () => {},
  color = 'black',
  className,
  ...rest
}) => {
  const classes: { [key: string]: string } = {
    black: 'dark:bg-white dark:text-black hover:opacity-90 bg-black text-white',
    white: 'dark:bg-black dark:text-white bg-white text-black',
    silver: 'dark:bg-black dark:text-white bg-button-gray text-black',
    transparent:
      'dark:text-white bg-transparent text-black border dark:border-dim-gray',
    'transparent-white':
      'dark:bg-white dark:text-black bg-transparent text-black border border-stroke-gray',
  };

  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ boxShadow: '0 0 6px lightgray' }}
      onClick={onClick}
      className={twMerge(
        `${classes[color]} inline-flex cursor-pointer justify-center px-7 py-3.5 text-lg font-bold transition`,
        className,
      )}
      {...rest}
    >
      {title}
    </motion.div>
  );
};
