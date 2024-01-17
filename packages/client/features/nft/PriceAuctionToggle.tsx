'use client';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Icon } from '@/components';
import { motion } from 'framer-motion';

type TPriceAuctionToggle = {
  initValue: 'fixedPrice' | 'auction';
  onClick: (v: string) => void;
};

const PriceAuctionToggle = ({ initValue, onClick }: TPriceAuctionToggle) => {
  const [value, setValue] = useState<'fixedPrice' | 'auction'>(initValue);

  const activeClass =
    'text-black border-black dark:border-white dark:text-white';

  const onClickHandler = (value: 'fixedPrice' | 'auction') => () => {
    setValue(value);
    onClick(value);
  };

  return (
    <div className="flex justify-center gap-3.5">
      <div
        className={twMerge(
          'py-3xl flex h-32 w-36 cursor-pointer flex-col items-center justify-center rounded-2xl border  text-txt-gray dark:border-davys-gray sm:w-full',
          value === 'fixedPrice' ? activeClass : '',
        )}
        onClick={onClickHandler('fixedPrice')}
      >
        <Icon name="tag" />
        <span>Fixed price</span>
      </div>
      <motion.div
        whileHover="hover"
        initial="initial"
        className={twMerge(
          'py-3xl relative flex h-32 w-36 cursor-not-allowed flex-col items-center justify-center rounded-2xl border  text-txt-gray dark:border-davys-gray sm:w-full',
          value === 'auction' ? activeClass : '',
        )}
        onClick={() => {
          //TODO add auction feature
        }}
      >
        <Icon name="auction" />
        <span>Auction</span>

        <motion.div
          onClick={(e) => e.stopPropagation()}
          variants={{
            initial: { opacity: 0, y: -15 },
            hover: { opacity: 1, y: 0 },
          }}
          data-tooltip="tooltip"
          className="margin-auto absolute -right-2 -top-[65px] left-0 right-0 z-50 p-4"
        >
          <div className=" whitespace-nowrap rounded-xl bg-black px-4 py-2 text-center  font-semibold text-white">
            Coming soon!
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PriceAuctionToggle;
