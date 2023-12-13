'use client';
import React, { FC, useEffect, useState } from 'react';
import { motion, useAnimate } from 'framer-motion';
import { Button, Icon, InputSearch } from '@/components';
import { twMerge } from 'tailwind-merge';
import { MultiSelect } from '@/components';
import { CATEGORIES } from '@/features/collection/constants';
import { FieldNames } from '@/features/nft/constants';

type TFilter = {
  onClose: () => void;
  styles?: string;
};

type TState = {
  fromPrice: number | null;
  toPrice: number | null;
  categories: string[];
};
const initState = { fromPrice: null, toPrice: null, categories: [] };
const NftFilter: FC<TFilter> = ({ onClose, styles }) => {
  const [scope, animate] = useAnimate();
  const [selectedFilters, setFilters] = useState<TState>(initState);

  const onPriceChange = (key: string) => (value: number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const onCategoryChange = (categories: string[]) => {
    setFilters((prev) => ({ ...prev, categories }));
  };

  useEffect(() => {
    animate(scope.current, { opacity: 1, x: [-50, 0] });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      className={twMerge(styles, 'h-full px-3.5 py-7')}
      ref={scope}
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
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3.5 pt-5">
          <p className="text-xl font-semibold">Price</p>
          <div className="flex items-center gap-2 pr-14 sm:w-2/4 md:w-full">
            <InputSearch
              placeholder="Min"
              className="w-28 rounded-lg"
              type="number"
              onChange={onPriceChange('priceFrom')}
            />
            <span className="text-txt-gray">to</span>
            <InputSearch
              placeholder="Max"
              className="w-28 rounded-lg"
              type="number"
              onChange={onPriceChange('priceTo')}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label
            htmlFor={FieldNames.nftImage}
            className="text-xl font-semibold"
          >
            Category
          </label>
          <MultiSelect
            label="Tags"
            placeholder="Please select categories"
            options={CATEGORIES}
            onChange={onCategoryChange}
          />
        </div>
      </div>

      <div className="grid gap-4 pt-7">
        <Button title="Apply" color="black" className="rounded-xl !text-lg" />
      </div>
    </motion.div>
  );
};

export default NftFilter;
