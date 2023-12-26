import React from 'react';
import { twMerge } from 'tailwind-merge';

type TItemInfo = {
  data: { [key: string]: any };
  mode: 'desktop' | 'tablet' | 'mobile';
};

const ItemInfo = ({ data, mode }: TItemInfo) => {
  switch (mode) {
    case 'desktop': {
      return <div></div>;
    }
    case 'tablet': {
      const { Items, Floor, Volume, Royalties, currency } = data;
      return (
        <ul className="grid h-32 grid-cols-1 rounded-2xl border border-stroke-gray text-lg md:w-2/4 lg:w-2/6 dark:border-dark-gray">
          <li className="grid grid-cols-2 gap-2 border-b border-stroke-gray p-4 dark:border-dark-gray">
            <div className="flex justify-between border-r border-stroke-gray pr-2.5 dark:border-dark-gray">
              <span className="text-txt-gray dark:text-white">Items</span>
              <span className="font-semibold">{Items}</span>
            </div>
            <div className="flex justify-between text-end">
              <span className="text-txt-gray dark:text-white">Floor</span>
              <span className="font-semibold">{Floor}</span>
            </div>
          </li>
          <li className="grid grid-cols-2 gap-2 p-4">
            <div className="flex justify-between border-r border-stroke-gray pr-2.5 dark:border-dark-gray">
              <span className="text-txt-gray dark:text-white">Volume</span>
              <span className="font-semibold">{Volume}</span>
            </div>
            <div className="flex justify-between text-end ">
              <span className="text-txt-gray dark:text-white">Royalties</span>
              <span className="font-semibold">{Royalties}</span>
            </div>
          </li>
        </ul>
      );
    }
    default: {
      const values = Object.keys(data);
      return (
        <ul className="rounded-2xl border border-stroke-gray px-4 dark:border-dark-gray">
          {values.map((val, i) => {
            return (
              <li
                className={twMerge(
                  'flex items-center justify-between py-4',
                  i !== values.length - 1
                    ? 'border-b border-stroke-gray dark:border-dark-gray'
                    : 'border-none',
                )}
              >
                <span className="text-txt-gray dark:text-white">{val}</span>
                <span className="font-semibold text-black dark:text-txt-gray">
                  {data[val]}
                </span>
              </li>
            );
          })}
        </ul>
      );
    }
  }
};

export default ItemInfo;
