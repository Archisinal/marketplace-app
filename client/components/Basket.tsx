"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Icon, Button, BasketItem, Modal } from "@/components";
import { auctionData } from "@/data/auctionItems";
import { abbriviateNumber } from "@/utils/formaters";

const Basket = () => {
  const [isShown, showBasket] = useState(false);
  const [items, setItems] = useState(auctionData);

  const totalPrice = items.reduce((acc, item) => acc + item.price.value, 0);

  const clickHandler = () => {
    showBasket(!isShown);
  };
  return (
    <div className="dark:border-dark-gray border border-stroke-gray rounded-lg p-1 cursor-pointer">
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
            className=" flex flex-col rounded-xl bg-white dark:bg-black-rus dark:text-white absolute top-0 right-0 w-full max-w-[360px] h-screen sm:max-h-[710px]  z-10 p-3.5"
          >
            <div className="flex border-b border-stroke-gray dark:border-dark-gray py-5 justify-between font-semibold">
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
            <ul className="py-7 flex flex-col gap-5 overflow-auto">
              {items.map((item, i) => (
                <li key={i}>
                  <BasketItem {...item} />
                </li>
              ))}
            </ul>
            <div className=" mt-auto border-t border--stroke-gray dark:border-dark-gray py-4 flex flex-col gap-12">
              <div className="flex justify-between font-semibold">
                <div>Total price</div>
                <div className="flex flex-col gap-1 items-end">
                  <span className="text-xl">{`${abbriviateNumber(
                    totalPrice,
                    2,
                    false
                  )} ASTR`}</span>
                  <span className="text-sm text-txt-gray">{"$1,357.06"}</span>
                </div>
              </div>
              <Button
                title="Complete purchase"
                color="black"
                className="rounded-2xl w-full"
              />
            </div>
          </motion.div>
        </Modal>
      )}
    </div>
  );
};

export default Basket;
