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
      whileHover={{ y: -5, boxShadow: '0 0 2px #d4d4d4' }}
      onClick={() => router.push('/explore/nft/item')}
      className="flex h-full w-full max-w-sm cursor-pointer flex-col justify-start overflow-hidden rounded-2xl"
    >
      <div className="relative flex-1">
        <ImageComponent fill src={itemImg} />
      </div>
      <div className="rounded-b-2xl border dark:!border-vulcan">
        <div>
          <div className="p-3">
            <p className="truncate font-extrabold">{name}</p>
            <p className="text-sm text-txt-gray">{company}</p>
          </div>
          <p className="border-t dark:border-dark-gray"></p>
          <div className="px-4 py-3">
            <div className="flex items-center">
              <div className="flex w-full justify-between gap-1">
                <div>
                  <p className="hidden text-sm text-txt-gray sm:block">
                    By owner
                  </p>
                  <p className="truncate text-sm font-semibold sm:text-base">
                    {owner.name}
                  </p>
                </div>
                <div>
                  <p className="hidden text-end text-sm text-txt-gray sm:block">
                    Price
                  </p>
                  <p className="flex gap-1.5 text-sm sm:text-base">
                    <span>{abbriviateNumber(price.value, 2, false)}</span>
                    <span className="text-davys-gray">{price.currency}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NftListItem;
