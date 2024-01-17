import React, { FC, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ImageComponent } from '@/components';
import { formatAddress, formatPrice } from '@/utils/formaters';
import { twMerge } from 'tailwind-merge';
import { NodeContext } from '@/context';
import IdentIcon from '@/features/wallet-connect/components/Identicon';

type TNftListItem = {
  id: string;
  name?: string;
  price: { value?: number | string; currency: string };
  imgUrl: string;
  collectionName?: string;
  idInCollection: string;
  owner: string;
  creator?: string;
};

const NftListItem: FC<TNftListItem> = ({
  id,
  name,
  idInCollection,
  price,
  imgUrl,
  collectionName,
  creator,
}) => {
  const { api } = useContext(NodeContext);
  const router = useRouter();
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 0 2px #d4d4d4' }}
      onClick={() => router.push('/explore/nft/item/' + id)}
      className="flex h-full w-full max-w-sm cursor-pointer flex-col justify-start overflow-hidden rounded-2xl"
    >
      <div className="relative flex-1">
        <ImageComponent fill src={imgUrl} />
      </div>
      <div className="rounded-b-2xl border dark:!border-vulcan">
        <div>
          <div className="p-3">
            <p className="truncate font-extrabold">
              {name || '-'} #{idInCollection}
            </p>
            <p className="text-sm text-txt-gray">{collectionName || '-'}</p>
          </div>
          <p className="border-t dark:border-dark-gray"></p>
          <div className="px-4 py-3">
            <div className="flex items-center">
              <div className="flex w-full justify-between gap-1">
                <div>
                  <p className="hidden text-sm text-txt-gray sm:block">
                    Created by
                  </p>
                  <p className="flex items-center gap-2 truncate text-sm font-semibold sm:text-base">
                    <IdentIcon address={creator || ''} size={20} />
                    {formatAddress(creator, 2, 4, 9)}
                  </p>
                </div>
                <div>
                  <p className="hidden text-end text-sm text-txt-gray sm:block">
                    Price
                  </p>
                  <p
                    className={twMerge(
                      'flex gap-1.5 text-sm sm:text-base',
                      !price.value && 'text-davys-gray',
                    )}
                  >
                    <span className="whitespace-nowrap">
                      {price.value
                        ? formatPrice(price.value, api!)
                        : '- ' + price.currency}
                    </span>
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
