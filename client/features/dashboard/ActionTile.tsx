'use client';
import React, { FC } from 'react';
import Icon from '../../icons';
import { TIconNames } from '@/icons/Icons.types';
import { motion } from 'framer-motion';

type TActionTile = {
  iconName: string;
  title: string;
  description: string;
};

export const ActionTile: FC<TActionTile> = ({
  iconName,
  title,
  description,
}) => {
  const bgClass: { [key: string]: string } = {
    wallet: 'bg-neon-blue',
    store: 'bg-chateau-green',
    mountains: 'bg-blue-violet',
    sale: 'bg-cinnabar',
  };

  return (
    <motion.div
      whileHover={{ boxShadow: '0 0 9px gray' }}
      className="flex cursor-pointer flex-col gap-2.5 rounded-[15px] bg-button-gray p-5 dark:bg-dark"
    >
      <div
        className={`flex h-[52px] w-[52px] items-center justify-center rounded-10 ${bgClass[iconName]}`}
      >
        <Icon name={iconName as TIconNames} />
      </div>
      <div className="text-xl font-bold ">{title}</div>
      <div className="text-dim-gray">{description}</div>
    </motion.div>
  );
};
