'use client';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Icon } from '@/components';

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
          'py-3xl flex h-32 w-36 cursor-pointer flex-col items-center justify-center rounded-2xl border  text-txt-gray sm:w-full dark:border-davys-gray',
          value === 'fixedPrice' ? activeClass : '',
        )}
        onClick={onClickHandler('fixedPrice')}
      >
        <Icon name="tag" />
        <span>Fixed price</span>
      </div>
      <div
        className={twMerge(
          'py-3xl flex h-32 w-36 cursor-pointer flex-col items-center justify-center rounded-2xl border  text-txt-gray sm:w-full dark:border-davys-gray',
          value === 'auction' ? activeClass : '',
        )}
        onClick={onClickHandler('auction')}
      >
        <Icon name="auction" />
        <span>Auction</span>
      </div>
    </div>
  );
};

export default PriceAuctionToggle;
