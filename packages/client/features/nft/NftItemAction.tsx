'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Description from '@/components/ui/Description';
import { Button, Icon } from '@/components';
import { NFT } from '@archisinal/backend';
import { formatAddress } from '@/utils/formaters';

type TNftItemAction = {
  description: string;
  onBackClick: () => void;
  onButtonClick: () => void;
  nft: NFT;
};

const NftItemAction = ({
  nft,
  description,
  onBackClick,
  onButtonClick,
}: TNftItemAction) => {
  const router = useRouter();

  const onShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Archisinal: ' + nft.name,
          url: window.location.href,
        })
        .then(() => {
          console.log('Thanks for sharing!');
        })
        .catch(console.error);
    } else {
      console.log('WebShare API not supported.');
    }
  };

  return (
    <div className="md:sticky md:top-28 md:self-start">
      <div className="flex flex-col gap-3.5">
        <div className="flex cursor-pointer items-center gap-1.5">
          <span onClick={onBackClick}>
            <Icon name="arrowLeft" />
          </span>
          <p>{nft.collection.name}</p>
        </div>
        <div className="text-2xl font-bold">
          {nft.name} #{nft.id_in_collection}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <span className="text-txt-gray">Owned by</span>
            <span className="font-bold">{formatAddress(nft.owner)}</span>
          </div>
          <div className="flex items-center gap-1 rounded-xl border border-stroke-gray px-2 py-px dark:border-dark-gray dark:bg-dark">
            <span>
              <Icon name="eye" />
            </span>
            <span className="font-semibold dark:text-light-silver">243</span>
          </div>
        </div>
        <div>
          <Description value={nft.description || ''} className="leading-6" />
        </div>
      </div>

      <div className="border-t border-stroke-gray dark:border-dark-gray">
        <div className="flex justify-between py-6 text-sm dark:text-light-silver">
          <div className="flex gap-3.5 font-semibold">
            <div className="flex items-center justify-center gap-1 rounded-2xl border border-stroke-gray px-1.5 py-1 dark:border-dark-gray dark:bg-dark md:cursor-pointer ">
              <Icon name="heart" />
              <span>10</span>
            </div>
            <div className="flex items-center justify-center gap-1 rounded-2xl border border-stroke-gray px-1.5 py-2 dark:border-dark-gray dark:bg-dark md:cursor-pointer">
              <Icon name="refresh" />
              <span>Refresh</span>
            </div>
            <div
              onClick={onShareClick}
              className="flex items-center justify-center gap-1 rounded-2xl border border-stroke-gray px-1.5 py-2 dark:border-dark-gray dark:bg-dark md:cursor-pointer"
            >
              <Icon name="share" />
              <span>Share</span>
            </div>
          </div>
          <div className="flex items-center justify-center rounded-2xl border border-stroke-gray px-3 dark:border-dark-gray dark:bg-dark md:cursor-pointer">
            <Icon name="dots" />
          </div>
        </div>
        <div className="flex flex-col gap-3.5 rounded-xl border border-stroke-gray p-2.5 dark:border-dark-gray sm:border-none">
          <div className="flex flex-col gap-1 gap-3.5 rounded-xl border-stroke-gray p-1.5 dark:border-dark-gray sm:flex-row sm:border">
            <div className="flex flex-col gap-2 rounded-xl border bg-button-gray p-2.5 dark:border-none dark:bg-dark sm:w-full">
              <p className="text-txt-gray">Fixed price</p>
              <p className="text-2xl font-bold">0.8 ASTR</p>
              <p className="text-txt-gray">$1,537.06</p>
            </div>
            <div className="flex flex justify-center gap-1 gap-2 rounded-xl dark:bg-dark sm:w-full sm:flex-col sm:border sm:bg-button-gray sm:p-2.5 sm:dark:border-none">
              <p className="sm:text-txt-gray">Last sale price</p>
              <p className="font-bold sm:text-2xl">2.8 ASTR</p>
              <p className="hidden text-txt-gray sm:block">$5,537.06</p>
            </div>
          </div>
          <div className="flex flex-col gap-3.5 md:grid md:grid-cols-main-button md:gap-6">
            <Button
              color="black"
              onClick={onButtonClick}
              title={
                <span className="flex items-center justify-center gap-1">
                  <Icon name="circleAdd" /> Buy now
                </span>
              }
              className="w-full rounded-2xl"
            />
            <Button
              color="white"
              title={
                <span className="flex items-center justify-center gap-1">
                  <Icon name="shoppingCart" /> Add
                </span>
              }
              className="w-full rounded-2xl border border-stroke-gray dark:border-dark-gray"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftItemAction;
