"use client";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "@/components";

type TPriceAuctionToggle = {
  initValue: "fixedPrice" | "auction";
  onClick: (v: string) => void;
};

const PriceAuctionToggle = ({ initValue, onClick }: TPriceAuctionToggle) => {
  const [value, setValue] = useState<"fixedPrice" | "auction">(initValue);

  const activeClass =
    "text-black border-black dark:border-white dark:text-white";

  const onClickHandler = (value: "fixedPrice" | "auction") => () => {
    setValue(value);
    onClick(value);
  };

  return (
    <div className="flex gap-3.5 justify-center">
      <div
        className={twMerge(
          "w-36 sm:w-full h-32 py-3xl flex flex-col items-center justify-center border dark:border-davys-gray  rounded-2xl text-txt-gray cursor-pointer",
          value === "fixedPrice" ? activeClass : ""
        )}
        onClick={onClickHandler("fixedPrice")}
      >
        <Icon name="tag" />
        <span>Fixed price</span>
      </div>
      <div
        className={twMerge(
          "w-36 sm:w-full h-32 py-3xl flex flex-col items-center justify-center border dark:border-davys-gray  rounded-2xl text-txt-gray cursor-pointer",
          value === "auction" ? activeClass : ""
        )}
        onClick={onClickHandler("auction")}
      >
        <Icon name="auction" />
        <span>Auction</span>
      </div>
    </div>
  );
};

export default PriceAuctionToggle;
