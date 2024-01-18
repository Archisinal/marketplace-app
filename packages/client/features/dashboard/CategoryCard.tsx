'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import ImageComponent from '../../components/ui/ImageComponent';
import { motion } from 'framer-motion';

type TCategoryCard = {
  itemImg: string;
  category: string;
};

const CategoryCard: FC<TCategoryCard> = ({ itemImg, category }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className=" xlg:w[80%] flex w-[90%] cursor-pointer flex-col rounded-2xl border dark:border-vulcan"
    >
      <Link
        href={{
          pathname: '/explore/nfts',
          query: { categories: category.toLowerCase() },
        }}
      >
        <div className="relative h-28 sm:h-36">
          <ImageComponent
            fill={true}
            src={itemImg}
            className="rounded-2xl brightness-95"
          />
        </div>
        <div className="my-4 text-center font-semibold">{category}</div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
