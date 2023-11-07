"use client";

import React, { FC } from "react";
import ImageComponent from "../../components/ui/ImageComponent";
import { motion } from "framer-motion";

type TCategoryCard = {
  itemImg: string;
  category: string;
};

const CategoryCard: FC<TCategoryCard> = ({ itemImg, category }) => {
  return (
    <motion.div
      whileHover={{ transform: "translateY(-5px)" }}
      className="cursor-pointer flex flex-col border dark:border-vulcan rounded-2xl max-w-[138px] sm:max-w-[227px] md:max-w=[229px] lg:w-56 xlg:w-60"
    >
      <div className="h-28 sm:h-36">
        <ImageComponent
          src={itemImg}
          style={{ height: "100%", width: "100%" }} //aligning images
        />
      </div>
      <div className="font-semibold my-4 text-center">{category}</div>
    </motion.div>
  );
};

export default CategoryCard;
