"use client";

import React, { FC } from "react";
import ImageComponent from "../../components/ui/ImageComponent";
import { motion } from "framer-motion";
import { abbriviateNumber } from "@/utils/formaters";

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
      whileHover={{ transform: "translateY(-5px)" }}
      className=" flex flex-col sm:max-w-xs md:w-72 lg:w-80 cursor-pointer"
    >
      <div className="h-48 md:h-56 lg:h-72 translate-y-2.5">
        <ImageComponent
          src={itemImg}
          style={{ height: "100%", width: "100%" }} //aligning images
        />
      </div>
      <div className="border dark:border-dark-gray rounded-b-20 pt-4">
        <div className="px-5">
          <p className="text-xl font-extrabold">{name}</p>
          <p className="text-txt-gray">{company}</p>
        </div>
        <div className=" px-5 mt-4 mb-4">
          <p className="border-t dark:border-dark-gray"></p>
          <div className="flex mt-4 items-center">
            <div className="mr-2.5">
              <ImageComponent width={46} height={46} src={owner.imgSrc} />
            </div>
            <div className="flex justify-between w-full">
              <div>
                <p className="text-txt-gray ">By owner</p>
                <p className="text-18px font-semibold">{owner.name}</p>
              </div>
              <div>
                <p className="text-txt-gray text-end">Price</p>
                <p className="text-18px flex gap-1 font-semibold">
                  <span>{abbriviateNumber(price.value)}</span>
                  <span className="text-davys-gray">{price.currency}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ItemCard;
