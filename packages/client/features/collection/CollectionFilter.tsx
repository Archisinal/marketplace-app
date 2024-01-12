'use client';
import React, { FC, useEffect, useState } from 'react';
import { motion, useAnimate } from 'framer-motion';
import { Button, Icon, InputSearch } from '@/components';
import { twMerge } from 'tailwind-merge';
import TextField from '@/components/ui/TextField';

type TFilter = {
  onClose: () => void;
  styles?: string;
};

type TState = {
  fromPrice: number | null;
  toPrice: number | null;
};
const initState = { fromPrice: null, toPrice: null };

const CollectionFilter: FC<TFilter> = ({ onClose, styles }) => {
  const [selectedFilters, setFilters] = useState<TState>(initState);

  const onPriceChange = (key: string) => (value: number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, x: [-50, 0] }}
      className={twMerge(
        styles,
        'fixed bottom-0 left-0 right-0 top-0 z-50 flex h-screen flex-col gap-12 self-start rounded-lg border border-stroke-gray bg-white p-8 dark:border-dark-gray dark:bg-black-rus md:sticky md:top-24 md:z-auto md:mt-1 md:h-auto',
      )}
    >
      <div className="flex justify-between text-2xl font-bold">
        <p>FILTER</p>
        <motion.span
          onClick={onClose}
          className="cursor-pointer"
          transition={{ duration: 0.2 }}
          whileHover={{ opacity: 0.5 }}
        >
          <Icon name="close" />
        </motion.span>
      </div>
      <div className="flex flex-1 flex-col gap-3.5">
        <p className="text-xl font-semibold">Floor Price</p>
        <div className="flex w-full items-center gap-2">
          <TextField
            placeholder="Min"
            className="flex-1"
            type="number"
            onChange={onPriceChange('priceFrom')}
          />
          <span className="text-txt-gray">to</span>
          <TextField
            placeholder="Max"
            className="flex-1"
            type="number"
            onChange={onPriceChange('priceTo')}
          />
        </div>
      </div>
      <Button
        title="Apply"
        color="black"
        className="w-full rounded-xl !text-lg"
      />
    </motion.div>
  );
};

export default CollectionFilter;
