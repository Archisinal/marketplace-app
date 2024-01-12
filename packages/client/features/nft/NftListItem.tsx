import React, { FC } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ImageComponent } from '@/components';
import { abbriviateNumber } from '@/utils/formaters';

type TNftListItem = {
  name: string;
  price: { value: number; currency: string };
  itemImg: string;
  company: string;
  owner: {
    name: string;
    imgSrc: string;
  };
};

const NftListItem: FC<TNftListItem> = ({
  name,
  price,
  itemImg,
  company,
  owner,
}) => {
  const router = useRouter();
  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={() => router.push('/explore/nft/item')}
      className="flex h-full w-full max-w-sm cursor-pointer flex-col justify-start overflow-hidden rounded-2xl"
    >
      <div className="relative flex-1">
        <ImageComponent fill src={itemImg} />
      </div>
      <motion.div
        whileHover={{ boxShadow: '0px 0px 3px white' }}
        className="rounded-b-20 border dark:!border-vulcan"
      >
        <div className="hidden md:block">
          <div className="px-3 py-3">
            <p className="truncate font-extrabold">{name}</p>
            <p className="text-sm text-txt-gray">{company}</p>
          </div>
          <p className="border-t dark:border-dark-gray"></p>
          <div className="px-4 py-3">
            <div className="flex items-center">
              <div className="flex w-full justify-between gap-1">
                <div>
                  <p className="text-sm text-txt-gray">By owner</p>
                  <p className="truncate font-semibold lg:text-base">
                    {owner.name}
                  </p>
                </div>
                <div>
                  <p className="text-end text-sm text-txt-gray">Price</p>
                  <p className="flex gap-1.5 font-semibold">
                    <span>{abbriviateNumber(price.value, 2, false)}</span>
                    <span className="text-davys-gray">{price.currency}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:hidden">
          <div className="px-5">
            <p className="truncate text-sm font-bold sm:text-lg">{name}</p>
            <p className="mt-2 hidden border-t dark:!border-davys-gray sm:block"></p>
          </div>
          <div className="mb-2 mt-2 flex items-center gap-2 px-5 text-sm sm:text-base">
            <span className="text-txt-gray">Price:</span>
            <span className="text-black dark:text-white sm:text-lg sm:font-semibold">
              {abbriviateNumber(price.value, 2, false)}
            </span>
            <span className="text-davys-gray sm:text-lg sm:font-semibold">
              {price.currency}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NftListItem;
