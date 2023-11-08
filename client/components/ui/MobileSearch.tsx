'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Icon, InputSearch } from '@/components';

type TMobileSearch = {
  onSearch: (v: string) => void;
  isShown: boolean;
  showInput: (v: boolean) => void;
};

const MobileSearch = ({ onSearch, isShown, showInput }: TMobileSearch) => {
  const clickHandler = () => showInput(true);
  return (
    <div className="rounded-lg border border-stroke-gray p-1 dark:border-dark-gray">
      <span className="sm:hidden" onClick={clickHandler}>
        <Icon name="search" width="24" height="24" />
      </span>
      <span className="hidden sm:block" onClick={clickHandler}>
        <Icon name="search" width="30" height="30" />
      </span>
      {isShown && (
        <motion.div
          initial={{ top: -10 }}
          animate={{ top: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute right-0 top-0 z-10 w-full p-2 "
        >
          <InputSearch
            onChange={onSearch}
            suffix={
              <span
                onClick={() => {
                  showInput(false);
                  onSearch('');
                }}
              >
                <Icon name="close" widh="16" height="16" />
              </span>
            }
            className="bg-white px-2 py-4 text-sm sm:text-base"
            noCleaarIcon={true}
          />
        </motion.div>
      )}
    </div>
  );
};

export default MobileSearch;
