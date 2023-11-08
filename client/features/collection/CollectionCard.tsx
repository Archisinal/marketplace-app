"use client";
import React, { FC } from "react";
import ImageComponent from "../../components/ui/ImageComponent";
import { motion } from "framer-motion";
import { abbriviateNumber } from "@/utils/formaters";

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
      whileHover={{ transform: "translateY(-5px)" }}
      className="flex flex-col w-56 sm:w-82 cursor-pointer "
    >
      <div className="h-[178px] sm:h-[246px] translate-y-2.5">
        <ImageComponent
          src={itemImg}
          style={{ height: "100%", width: "100%" }} //aligning images
        />
      </div>
      <div>
        {/* Mobile screen */}
        <div className="border dark:!border-dark-gray rounded-b-20 pt-4 sm:hidden">
          <div className="px-5 text-xl">
            <p className="font-extrabold">{company}</p>
          </div>
          <div className=" px-5 mt-4 mb-4">
            <p className="border-t dark:!border-davys-gray"></p>
            <div className="flex mt-4 items-center">
              <div className="flex justify-between w-full">
                <div>
                  <p className="text-xs text-txt-gray ">Floor:</p>
                  <p className="text-[15px] font-semibold">
                    <span>{abbriviateNumber(price.value)}</span>
                    <span>{price.currency}</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-txt-gray">24h volume</p>
                  <p className="text-[15px] flex gap-1 font-semibold">
                    <span>{volume24h}</span>
                    <span className="text-davys-gray">{price.currency}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tablet + screen */}
        <div className=" hidden sm:block border dark:!border-dark-gray rounded-b-20 pt-6 pb-6">
          <div className="px-5 flex justify-between">
            <div className="text-xl font-extrabold">{company}</div>
            <div className="text-lg font-semibold flex gap-1.5">
              <span>{abbriviateNumber(price.value)}</span>
              <span className="dark:text-raven">{price.currency}</span>
            </div>
          </div>
          <div className="flex justify-between px-5">
            <div className="flex gap-1.5">
              <span className="text-txt-gray">Floor:</span>
              <span className="dark:text-white text-davys-gray">{`${price.value} ${price.currency}`}</span>
            </div>
            <div className="flex gap-1.5">
              <span className="dark:text-white text-davys-gray">{`$${total.value}`}</span>
              <span className="text-dark-pastel-green">{`+${total.dif}%`}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CollectionCard;
