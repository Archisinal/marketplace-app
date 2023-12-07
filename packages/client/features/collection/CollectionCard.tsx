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
  name,
  company,
  volume24h,
  price,
  total,
  itemImg,
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="flex w-56 cursor-pointer flex-col sm:w-82 "
    >
      <div className="h-[178px] translate-y-2.5 sm:h-[246px]">
        <ImageComponent
          src={itemImg}
          style={{ height: '100%', width: '100%' }} //aligning images
        />
      </div>
      <div>
        {/* Mobile screen */}
        <div className="rounded-b-20 border pt-4 dark:!border-dark-gray sm:hidden">
          <div className="px-5 text-xl">
            <p className="font-extrabold">{company}</p>
          </div>
          <div className=" mb-4 mt-4 px-5">
            <p className="border-t dark:!border-davys-gray"></p>
            <div className="mt-4 flex items-center">
              <div className="flex w-full justify-between">
                <div>
                  <p className="text-xs text-txt-gray ">Floor:</p>
                  <p className="text-[15px] font-semibold">
                    <span>{abbriviateNumber(price.value)}</span>
                    <span>{price.currency}</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-txt-gray">24h volume</p>
                  <p className="flex gap-1 text-[15px] font-semibold">
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
          className=" hidden rounded-b-20 border pb-6 pt-6 dark:!border-dark-gray sm:block"
        >
          <div className="flex justify-between px-5">
            <div className="text-xl font-extrabold">{company}</div>
            <div className="flex gap-1.5 text-lg font-semibold">
              <span>{abbriviateNumber(price.value)}</span>
              <span className="dark:text-raven">{price.currency}</span>
            </div>
          </div>
          <div className="flex justify-between px-5">
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
