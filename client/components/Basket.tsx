import React from "react";
import { Icon } from "@/components";

// TODO: no basket designs
const Basket = () => {
  return (
    <div className="dark:border-dark-gray border border-stroke-gray rounded-lg p-1 cursor-pointer">
      <span className="sm:hidden">
        <Icon name="basket" width="24" height="24" />
      </span>
      <span className="hidden sm:block md:hidden">
        <Icon name="basket" width="30" height="30" />
      </span>
      <span className="hidden md:block">
        <Icon name="basket" width="32" height="32" />
      </span>
    </div>
  );
};

export default Basket;
