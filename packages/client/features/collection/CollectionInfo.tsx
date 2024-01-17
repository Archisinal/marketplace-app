'use client';

import { Collection } from '@archisinal/backend';
import IdentIcon from '@/features/wallet-connect/components/Identicon';
import {
  formatAddress,
  formatPercentage,
  formatPrice,
} from '@/utils/formaters';
import Description from '@/components/ui/Description';
import { ItemInfo } from '@/features/collection/index';
import React, { useContext } from 'react';
import Link from 'next/link';
import { Icon } from '@/components';
import { NodeContext } from '@/context';
import { useScreenSize } from '@/utils/resolutionScreens';

const CollectionInfo = ({ collection }: { collection: Collection }) => {
  const prices = collection?.nfts
    ?.map((nft) => nft.listings)
    .flat()
    .filter((listing) => listing?.status === 'active' && listing?.price)
    .map((listing) => (listing ? parseInt(listing.price) : 0));

  const sold = collection.nfts
    ?.map((nft) => nft.listings)
    .flat()
    .filter((listing) => listing?.status === 'sold' && listing?.price);

  const numbers = {
    floorPrice: prices ? Math.min(...prices) : undefined,
    volume: sold
      ?.map((listing) => (listing ? parseInt(listing.price) : 0))
      .reduce((a, b) => a + b, 0),
    sales: sold?.length,
    items: collection.nfts?.length,
  };
  const screen = useScreenSize();

  const { subscanUrl, api } = useContext(NodeContext);

  return (
    <div className="flex-col gap-8 md:flex">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end ">
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex justify-between">
            <p className="text-3xl font-bold text-black dark:text-white">
              {collection.name}
            </p>
          </div>
          <div className="flex flex-col gap-2 text-txt-gray sm:flex-row sm:items-center sm:gap-6">
            <div className="flex items-center gap-2">
              Created By{' '}
              <span className="flex items-center gap-2 font-bold text-black dark:text-white">
                <IdentIcon address={collection.collection_owner} />
                {formatAddress(collection.collection_owner)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              Address{' '}
              <span className="font-bold text-black dark:text-white">
                <span className="flex items-center gap-1">
                  <Link
                    href={`${subscanUrl}/account/${collection.address}`}
                    className="flex items-center gap-2"
                  >
                    <Icon name="arrowRightUp" />
                    {formatAddress(collection.address)}
                  </Link>
                </span>
              </span>
            </div>
          </div>
          <Description
            value={collection.metadata}
            className="w-full text-lg leading-6 sm:w-3/4 md:w-1/2"
          />
        </div>

        <ItemInfo
          data={{
            Items: numbers.items,
            Volume: formatPrice(numbers.volume, api) || '-',
            Floor: formatPrice(numbers.floorPrice, api) || '-',
            Royalties: `${formatPercentage(collection.royalty)}%`,
          }}
          mode={screen}
        />
      </div>
    </div>
  );
};

export default CollectionInfo;
