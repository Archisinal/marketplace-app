'use client';

import React, { FC } from 'react';
import { motion } from 'framer-motion';
import ImageComponent from '@/components/ui/ImageComponent';
import Icon from '@/icons';
import { abbriviateNumber } from '@/utils/formaters';

export type TAuctionCard = {
  name: string;
  company: string;
  price: { value: number; currency: string };
  endIn: string;
  itemImg: string;
};

const AuctionCard: FC<TAuctionCard> = ({
  name,
  company,
  endIn,
  price,
  itemImg,
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="flex w-56 cursor-pointer flex-col rounded-2xl sm:w-82"
    >
      <div className="h-[178px] translate-y-2.5 sm:h-[228px]">
        <ImageComponent
          src={itemImg}
          style={{ height: '100%', width: '100%' }} //aligning images
        />
      </div>
      <motion.div
        whileHover={{ boxShadow: '0px 0px 2px gray' }}
        className="rounded-b-20 border pt-4 dark:!border-dark-gray"
      >
        <div className="px-5">
          <p className="font-extrabold sm:text-xl">{name}</p>
          <p className="hidden text-txt-gray sm:block">{company}</p>
        </div>
        <div className=" mb-4 mt-4 px-5">
          <p className="border-t dark:!border-dark-gray"></p>
          <div className="mt-4 flex items-center">
            <div className="flex w-full justify-between">
              <div>
                <p className="text-xs text-txt-gray  sm:text-base ">Ends in</p>
                <p className="text-sm font-semibold sm:text-lg">{endIn}</p>
              </div>
              <div>
                <p className="text-xs text-txt-gray sm:text-base">
                  Highest Bid
                </p>
                <p className="flex gap-2 text-sm font-semibold sm:text-lg">
                  <span>{abbriviateNumber(price.value, 2, false)}</span>
                  <span className="text-davys-gray">{price.currency}</span>
                  <span>
                    <Icon name="hummer" />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AuctionCard;
