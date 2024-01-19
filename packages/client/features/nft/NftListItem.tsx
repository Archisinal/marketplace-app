'use client';

import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ImageComponent } from '@/components';
import { formatAddress, formatIpfsLink, formatPrice } from '@/utils/formaters';
import { twMerge } from 'tailwind-merge';
import { NodeContext } from '@/context';
import IdentIcon from '@/features/wallet-connect/components/Identicon';
import { NFT } from '@archisinal/backend';

const NftListItem = ({ nft, className }: { nft: NFT; className?: string }) => {
  const { api } = useContext(NodeContext);
  const router = useRouter();

  const nftPrice = nft?.listings?.find(
    ({ status }) => status === 'active',
  )?.price;

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 0 2px #d4d4d4' }}
      onClick={() => router.push('/explore/nft/item/' + nft.id)}
      className={twMerge(
        'flex h-full w-full max-w-sm cursor-pointer flex-col justify-start overflow-hidden rounded-2xl',
        className,
      )}
    >
      <div className="relative flex-1">
        <ImageComponent fill src={formatIpfsLink(nft.img_url)} />
      </div>
      <div className="rounded-b-2xl border dark:!border-vulcan">
        <div>
          <div className="p-3">
            <p className="truncate font-extrabold">
              {nft.name || '-'} #{nft.id_in_collection}
            </p>
            <p className="text-sm text-txt-gray">
              {nft.collection?.name || '-'}
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
                    <IdentIcon address={nft.creator || ''} size={20} />
                    {formatAddress(nft.creator, 2, 4, 9)}
                  </p>
                </div>
                <div>
                  <p className="hidden text-end text-sm text-txt-gray sm:block">
                    Price
                  </p>
                  <p
                    className={twMerge(
                      'flex justify-end gap-1.5 text-sm sm:text-base',
                      !nftPrice && 'text-davys-gray',
                    )}
                  >
                    <span className="whitespace-nowrap">
                      {nftPrice ? formatPrice(nftPrice, api!) : '-'}
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
