'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BasketItem, Button, Icon, Modal } from '@/components';
import { auctionData } from '@/data/auctionItems';
import { abbriviateNumber } from '@/utils/formaters';

const Basket = () => {
  const [isShown, showBasket] = useState(false);
  const [items, setItems] = useState(auctionData);

  const totalPrice = items.reduce((acc, item) => acc + item.price.value, 0);

  const clickHandler = () => {
    showBasket(!isShown);
  };
  return (
    <div className="cursor-pointer rounded-lg border border-stroke-gray p-1 dark:border-dark-gray">
      <span onClick={clickHandler} className="sm:hidden">
        <Icon name="basket" width="24" height="24" />
      </span>
      <span onClick={clickHandler} className="hidden sm:block md:hidden">
        <Icon name="basket" width="30" height="30" />
      </span>
      <span onClick={clickHandler} className="hidden md:block">
        <Icon name="basket" width="32" height="32" />
      </span>
      {isShown && (
        <Modal
          containerClass="top-0 sm:top-10 sm:left-2/3 md:-translate-x-10 lg:-translate-x-1 xlg:translate-x-40"
          onClose={() => showBasket(false)}
          withCloseButton={false}
        >
          <motion.div
            initial={{ right: -50 }}
            animate={{ right: 0 }}
            transition={{ duration: 0.2 }}
            className=" absolute right-0 top-0 z-10 flex h-screen w-full max-w-[360px] flex-col rounded-xl bg-white p-3.5 dark:bg-black-rus  dark:text-white sm:max-h-[710px]"
          >
            <div className="flex justify-between border-b border-stroke-gray py-5 font-semibold dark:border-dark-gray">
              <div className="text-2xl">Your cart</div>
              <div className="flex gap-5 text-lg">
                <span onClick={() => setItems([])} className="cursor-pointer">
                  Clear all
                </span>
                <span className="cursor-pointer" onClick={clickHandler}>
                  <Icon name="close" />
                </span>
              </div>
            </div>
            <ul className="flex flex-col gap-5 overflow-auto py-7">
              {items.map((item, i) => (
                <li key={i}>
                  <BasketItem {...item} />
                </li>
              ))}
            </ul>
            <div className=" border--stroke-gray mt-auto flex flex-col gap-12 border-t py-4 dark:border-dark-gray">
              <div className="flex justify-between font-semibold">
                <div>Total price</div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xl">{`${abbriviateNumber(
                    totalPrice,
                    2,
                    false,
                  )} ASTR`}</span>
                  <span className="text-sm text-txt-gray">{'$1,357.06'}</span>
                </div>
              </div>
              <Button
                title="Complete purchase"
                color="black"
                className="w-full rounded-2xl"
              />
            </div>
          </motion.div>
        </Modal>
      )}
    </div>
  );
};

export default Basket;
