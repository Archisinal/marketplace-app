"use client";

import React, { FC } from "react";
import { motion } from "framer-motion";
import ImageComponent from "@/components/ui/ImageComponent";
import Icon from "@/icons";
import { abbriviateNumber } from "@/utils/formaters";

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
      whileHover={{ y: -5, boxShadow: "0px 2px 5px silver" }}
      className="cursor-pointer flex flex-col w-56 sm:w-82 rounded-2xl"
    >
      <div className="h-[178px] sm:h-[228px] translate-y-2.5">
        <ImageComponent
          src={itemImg}
          style={{ height: "100%", width: "100%" }} //aligning images
        />
      </div>
      <div className="border dark:!border-dark-gray rounded-b-20 pt-4">
        <div className="px-5">
          <p className="font-extrabold sm:text-xl">{name}</p>
          <p className="text-txt-gray hidden sm:block">{company}</p>
        </div>
        <div className=" px-5 mt-4 mb-4">
          <p className="border-t dark:!border-dark-gray"></p>
          <div className="flex mt-4 items-center">
            <div className="flex justify-between w-full">
              <div>
                <p className="text-xs sm:text-base  text-txt-gray ">Ends in</p>
                <p className="text-sm sm:text-lg font-semibold">{endIn}</p>
              </div>
              <div>
                <p className="text-xs sm:text-base text-txt-gray">
                  Highest Bid
                </p>
                <p className="text-sm sm:text-lg flex gap-2 font-semibold">
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
      </div>
    </motion.div>
  );
};

export default AuctionCard;
