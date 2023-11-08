'use client';
import React, { FC, useEffect, useState } from 'react';
import { motion, useAnimate } from 'framer-motion';
import { Button, DropDownCustom, Icon, InputSearch } from '../components';
import { twMerge } from 'tailwind-merge';

const defaultStatuses = [
  { label: 'All', value: 'all' },
  { label: 'By now', value: 'byNow' },
  { label: 'Auctions', value: 'auctions' },
];

const defaultFilterOptions = [
  {
    label: 'Category',
    value: 'category',
    component: () => <h3 className="text-txt-gray">Filter ComponentB</h3>,
  },
  {
    label: 'Price',
    value: 'price',
    component: () => <h3 className="text-txt-gray">Filter Component</h3>,
  },
  {
    label: 'Marketplace',
    value: 'marketplace',
    component: () => <h3 className="text-txt-gray">Filter Component</h3>,
  },
  {
    label: 'Type',
    value: 'type',
    component: () => <h3 className="text-txt-gray">Filter Component</h3>,
  },
  {
    label: 'Options',
    value: 'options',
    component: () => <h3 className="text-txt-gray">Filter Component</h3>,
  },
];
// TODO: Handling selected filters

type TFilter = {
  statuses?: { label: string; value: string }[];
  filteroptions?: {
    label: string;
    value: string;
    component: React.ReactNode;
  }[];
  onClose: () => void;
  styles?: string;
};

const Filter: FC<TFilter> = ({
  statuses = defaultStatuses,
  filteroptions = defaultFilterOptions,
  onClose,
  styles,
}) => {
  const [selectedFilters, setFilters] = useState({
    status: statuses[0].value,
  });
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(scope.current, { opacity: 1, x: [-50, 0] });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      className={twMerge(styles, 'h-max px-3.5 py-7')}
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
      <div className="flex flex-col gap-3.5 pt-7 text-xl ">
        <p className="font-semibold">Status</p>
        <ul className="flex gap-3.5">
          {statuses.map(({ label, value }, i) => {
            const isActive = selectedFilters.status === value;
            return (
              <li
                key={i}
                className={twMerge(
                  'cursor-pointer whitespace-nowrap rounded-lg px-4 py-2 text-lg',
                  isActive
                    ? 'border bg-black text-white dark:bg-white dark:text-black'
                    : 'border border-txt-gray bg-white text-txt-gray dark:border-none dark:bg-dark-gray dark:text-txt-gray',
                )}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, status: value }))
                }
              >
                {label}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex flex-col gap-3.5 pt-5">
        <p className="text-xl font-semibold">Price</p>
        <div className="flex items-center gap-2 pr-14 sm:w-2/4 md:w-full">
          <InputSearch placeholder="Min" className="w-28 rounded-lg" />
          <span className="text-txt-gray">to</span>
          <InputSearch placeholder="Max" className="w-28 rounded-lg" />
        </div>
      </div>
      <div className="pt-5">
        <ul>
          {filteroptions.map((filter, i) => {
            return (
              <DropDownCustom
                key={i}
                label={filter.label}
                Component={filter.component as React.ElementType}
              />
            );
          })}
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-7">
        <Button
          title="Reset all"
          color="silver"
          className="rounded-xl !text-lg "
        />
        <Button title="Apply" color="black" className="rounded-xl !text-lg" />
      </div>
    </motion.div>
  );
};

export default Filter;
