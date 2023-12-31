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
      className="md:max-w=[229px] flex max-w-[138px] cursor-pointer flex-col rounded-2xl border sm:max-w-[227px] lg:w-56 xlg:w-60 dark:border-vulcan"
    >
      <Link href={{ pathname: '/explore/nfts', query: { category } }}>
        <div className="relative h-28 sm:h-36">
          <ImageComponent
            fill={true}
            src={itemImg}
            style={{ borderRadius: '15px' }} //aligning images
          />
        </div>
        <div className="my-4 text-center font-semibold">{category}</div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
