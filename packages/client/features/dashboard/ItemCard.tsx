'use client';

import React, { FC } from 'react';
import ImageComponent from '../../components/ui/ImageComponent';
import { motion } from 'framer-motion';
import { abbriviateNumber } from '@/utils/formaters';

type TItemCard = {
  name: string;
  company: string;
  owner: {
    name: string;
    imgSrc: string;
  };
  price: { value: number; currency: string };
  itemImg: string;
};

const ItemCard: FC<TItemCard> = ({ name, company, owner, price, itemImg }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className=" flex cursor-pointer flex-col rounded-2xl sm:max-w-xs md:w-72 lg:w-80"
    >
      <div className="relative h-48 translate-y-2.5 md:h-56 lg:h-72">
        <ImageComponent
          fill={true}
          src={itemImg}
          style={{ height: '100%', width: '100%' }} //aligning images
        />
      </div>
      <motion.div
        whileHover={{ boxShadow: '0px 0px 2px gray' }}
        className="rounded-b-20 border pt-6 dark:border-dark-gray"
      >
        <div className="px-5">
          <p className="truncate text-xl font-extrabold">{name}</p>
          <p className="truncate text-txt-gray">{company}</p>
        </div>
        <div className=" mb-4 mt-4 px-5">
          <p className="border-t dark:border-dark-gray"></p>
          <div className="mt-4 flex items-center">
            <div className="mr-2.5">
              <ImageComponent width={46} height={46} src={owner.imgSrc} />
            </div>
            <div className="flex w-full justify-between">
              <div>
                <p className="text-txt-gray ">By owner</p>
                <p className="font-semibold sm:text-lg">{owner.name}</p>
              </div>
              <div>
                <p className="text-end text-txt-gray">Price</p>
                <p className="flex gap-2 font-semibold sm:text-lg">
                  <span>{abbriviateNumber(price.value)}</span>
                  <span className="text-davys-gray">{price.currency}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ItemCard;
