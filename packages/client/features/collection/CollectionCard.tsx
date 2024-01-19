'use client';
import React, { FC } from 'react';
import ImageComponent from '../../components/ui/ImageComponent';
import { motion } from 'framer-motion';
import { abbriviateNumber } from '@/utils/formaters';

type TCollectionCard = {
  name: string;
  company: string;
  price: { value: number; currency: string };
  volume24h: number;
  itemImg: string;
  total: { value: number; dif: number };
};

const CollectionCard: FC<TCollectionCard> = ({
  company,
  volume24h,
  price,
  total,
  itemImg,
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="flex w-[90%] cursor-pointer flex-col py-2 sm:w-[95%]"
    >
      <div className="relative h-[220px] md:h-52 lg:h-64">
        <ImageComponent
          fill={true}
          src={itemImg}
          style={{ height: '100%', width: '100%' }} //aligning images
          className="rounded-t-2xl"
        />
      </div>
      <div>
        {/* Mobile screen */}
        <div className="rounded-b-20 border pt-3.5 dark:!border-dark-gray sm:hidden">
          <div className="px-5">
            <p className="font-extrabold">{company}</p>
          </div>
          <div className=" mb-4 mt-3 px-5">
            <p className="border-t dark:!border-davys-gray"></p>
            <div className="mt-4 flex items-center">
              <div className="flex w-full justify-between">
                <div>
                  <p className="text-xs text-txt-gray ">Floor:</p>
                  <p className="text-sm font-semibold">
                    <span>{abbriviateNumber(price.value)}</span>
                    <span>{price.currency}</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-txt-gray">24h volume</p>
                  <p className="flex gap-1 text-sm font-semibold">
                    <span>{volume24h}</span>
                    <span className="text-davys-gray">{price.currency}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tablet + screen */}
        <motion.div
          whileHover={{ boxShadow: '0px 0px 2px gray' }}
          className=" hidden rounded-b-20 border px-5 pb-6 pt-4 dark:!border-dark-gray sm:block"
        >
          <div className="flex justify-between gap-1.5">
            <div className="truncate font-extrabold">{company}</div>
            <div className="flex gap-1.5 font-semibold">
              <span>{abbriviateNumber(price.value)}</span>
              <span className="dark:text-raven">{price.currency}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-1.5">
              <span className="text-txt-gray">Floor:</span>
              <span className="text-davys-gray dark:text-white">{`${price.value} ${price.currency}`}</span>
            </div>
            <div className="flex gap-1.5">
              <span className="text-davys-gray dark:text-white">{`$${total.value}`}</span>
              <span className="text-dark-pastel-green">{`+${total.dif}%`}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CollectionCard;
