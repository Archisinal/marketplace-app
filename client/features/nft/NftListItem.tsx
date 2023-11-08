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
      className="flex max-w-sm cursor-pointer flex-col rounded-2xl"
    >
      <div className="h-34 translate-y-2.5 rounded-2xl sm:h-44">
        <ImageComponent
          src={itemImg}
          style={{ height: '100%', width: '100%' }} //aligning images
          className="rounded-2xl"
        />
      </div>
      <motion.div
        whileHover={{ boxShadow: '0px 0px 3px white' }}
        className="rounded-b-20 border pt-6 dark:!border-vulcan"
      >
        <div className="hidden md:block">
          <div className="px-5">
            <p className="truncate text-xl font-extrabold">{name}</p>
            <p className="text-txt-gray">{company}</p>
          </div>
          <div className=" mb-4 mt-4 px-5">
            <p className="border-t dark:border-dark-gray"></p>
            <div className="mt-4 flex items-center">
              <div className="mr-2.5">
                <ImageComponent width={46} height={46} src={owner.imgSrc} />
              </div>
              <div className="flex w-full justify-between gap-1">
                <div>
                  <p className="text-txt-gray ">By owner</p>
                  <p className="truncate text-lg font-semibold lg:text-base">
                    {owner.name}
                  </p>
                </div>
                <div className="lg:text-base">
                  <p className="text-end text-txt-gray">Price</p>
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
