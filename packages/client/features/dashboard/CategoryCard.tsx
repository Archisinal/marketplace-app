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
    <motion.div whileHover={{ y: -5 }} className="relative h-full w-full">
      <Link
        href={{
          pathname: '/explore/nfts',
          query: { categories: category.toLowerCase() },
        }}
        className="flex h-full w-full flex-col items-center justify-center"
      >
        <div className="relative w-full flex-1">
          <ImageComponent
            fill={true}
            src={itemImg}
            className="rounded-2xl brightness-95"
          />
        </div>
        <div className="mt-4 text-center font-semibold">{category}</div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
