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
      className="md:max-w=[229px] flex max-w-[138px] cursor-pointer flex-col rounded-2xl border dark:border-vulcan sm:max-w-[227px] lg:w-56 xlg:w-60"
    >
      <Link href={{ pathname: '/explore/nfts', query: { category } }}>
        <div className="h-28 sm:h-36">
          <ImageComponent
            src={itemImg}
            style={{ height: '100%', width: '100%', borderRadius: '15px' }} //aligning images
          />
        </div>
        <div className="my-4 text-center font-semibold">{category}</div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
