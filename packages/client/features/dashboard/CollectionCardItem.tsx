'use client';

import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ImageComponent } from '@/components';
import {
  calcCollectionStats,
  formatAddress,
  formatIpfsLink,
  formatPrice,
} from '@/utils/formaters';
import { twMerge } from 'tailwind-merge';
import { NodeContext } from '@/context';
import IdentIcon from '@/features/wallet-connect/components/Identicon';
import { Collection, NFT } from '@archisinal/backend';

const CollectionCardItem = ({ collection }: { collection: Collection }) => {
  const { api } = useContext(NodeContext);
  const router = useRouter();
  const collectionStats = calcCollectionStats(collection);

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 0 2px #d4d4d4' }}
      onClick={() =>
        router.push('/explore/collection/item' + collection.address)
      }
      className={twMerge(
        'flex h-full w-full max-w-sm cursor-pointer flex-col justify-start overflow-hidden rounded-2xl',
      )}
    >
      <div className="relative flex-1">
        <ImageComponent fill src={formatIpfsLink(collection.uri || '')} />
      </div>
      <div className="rounded-b-2xl border dark:!border-vulcan">
        <div>
          <div className="p-3">
            <p className="truncate font-extrabold">{collection.name}</p>
            <p className="flex gap-2 text-sm">
              {collectionStats.items}{' '}
              {collectionStats.items === 1 ? 'item' : 'items'}
            </p>
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
                    <IdentIcon
                      address={collection.collection_owner || ''}
                      size={20}
                    />
                    {formatAddress(collection.collection_owner)}
                  </p>
                </div>
                <div>
                  <p className="hidden text-end text-sm text-txt-gray sm:block">
                    Floor price
                  </p>
                  <p
                    className={twMerge(
                      'flex gap-1.5 text-sm sm:text-base',
                      !collectionStats.floorPrice && 'text-davys-gray',
                    )}
                  >
                    <span className="whitespace-nowrap">
                      {collectionStats.floorPrice
                        ? formatPrice(collectionStats.floorPrice, api!)
                        : '-'}
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

export default CollectionCardItem;
