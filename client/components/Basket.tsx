"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@/components";

// TODO: no basket designs
const Basket = () => {
  const [isShown, showBasket] = useState(false);

  const clickHandler = () => showBasket(!isShown);
  return (
    <div
      className="dark:border-dark-gray border border-stroke-gray rounded-lg p-1 cursor-pointer"
      onClick={clickHandler}
    >
      <span className="sm:hidden">
        <Icon name="basket" width="24" height="24" />
      </span>
      <span className="hidden sm:block md:hidden">
        <Icon name="basket" width="30" height="30" />
      </span>
      <span className="hidden md:block">
        <Icon name="basket" width="32" height="32" />
      </span>
      {isShown && (
        <motion.div
          initial={{ right: -50 }}
          animate={{ right: 0 }}
          transition={{ duration: 0.2 }}
          className="rounded-xl bg-white dark:bg-dark-gray dark:text-white absolute top-0 right-0 w-full max-w-[360px] h-screen z-10"
        >
          <p className="flex justify-between p-3 text-lg font-semibold items-center">
            What are you waiting for? Buy now
            <span onClick={() => showBasket(false)}>
              <Icon name="arrowRight" />
            </span>
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Basket;
