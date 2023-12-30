'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Icon, ImageComponent, Tabs } from '@/components';
import Description from '@/components/ui/Description';
import { AuctionBidModal, Properties, TradingHistory } from '@/features/nft';

const description =
  'Lorem Ipsum is simply dummy text of the printing and typesetting typesetting text typesetting industry dummy text of the printing and typesetting typesetting text typesetting industry';

const Info = () => <h1>Info</h1>;

const properties = {
  Editions: 17,
  Owned: 0,
  Royalties: '2.02%',
  Minted: 'Jul 17, 2023',
  'Token ID': (
    <span className="flex items-center gap-1">
      <Icon name="arrowRightUp" />
      #829006
    </span>
  ),
  Metadata: (
    <span className="flex items-center gap-1">
      <Icon name="arrowRightUp" />
      IPFS
    </span>
  ),
  Contract: (
    <span className="flex items-center gap-1">
      <Icon name="arrowRightUp" />
      KT1RJ...dxton
    </span>
  ),
};

const tabsConfig = [
  { label: 'Properties', component: () => <Properties data={properties} /> },
  { label: 'Info', component: Info },
  { label: 'Trading history', component: TradingHistory },
];
export default function Auction() {
  const [bidModal, showBidModal] = useState(false);
  const router = useRouter();
  return (
    <div className="px-4">
      <div className="grid-cols-2 gap-7 md:grid">
        <div className="relative rounded-2xl border border-stroke-gray dark:border-dark-gray">
          <div className="p-2.5 sm:p-5">
            <ImageComponent
              fill={true}
              src="/mockAssets/3.png"
              className="h-full w-full  rounded-2xl object-cover"
            />
          </div>
          <span className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-lg bg-stroke-gray/50 sm:right-10 sm:top-10 ">
            <Icon name="zoomin" />
          </span>
        </div>
        <div>
          <div className="flex flex-col gap-3.5 pt-6">
            <div className="flex items-center gap-1.5">
              <span onClick={() => router.back()}>
                <Icon name="arrowLeft" />
              </span>
              <p>AlexByArchitecture</p>
            </div>
            <div className="text-2xl font-bold">Architecture Home #59</div>
            <div className="flex justify-between">
              <div className="flex gap-1">
                <span className="text-txt-gray">Owned by</span>
                <span className="font-bold">0x7091…d4Ce</span>
              </div>
              <div className="flex items-center gap-1 rounded-xl border border-stroke-gray px-2 py-px dark:border-dark-gray dark:bg-dark">
                <span>
                  <Icon name="eye" />
                </span>
                <span className="font-semibold dark:text-light-silver">
                  243
                </span>
              </div>
            </div>
            <div>
              <Description value={description} className="leading-6" />
            </div>
          </div>

          <div className="border-t border-stroke-gray dark:border-dark-gray">
            <div className="flex justify-between py-6 text-sm dark:text-light-silver">
              <div className="flex gap-3.5 font-semibold">
                <div className="flex items-center justify-center gap-1 rounded-2xl border border-stroke-gray px-1.5 py-1 md:cursor-pointer dark:border-dark-gray dark:bg-dark ">
                  <Icon name="heart" />
                  <span>10</span>
                </div>
                <div className="flex items-center justify-center gap-1 rounded-2xl border border-stroke-gray px-1.5 py-2 md:cursor-pointer dark:border-dark-gray dark:bg-dark">
                  <Icon name="refresh" />
                  <span>Refresh</span>
                </div>
                <div className="flex items-center justify-center gap-1 rounded-2xl border border-stroke-gray px-1.5 py-2 md:cursor-pointer dark:border-dark-gray dark:bg-dark">
                  <Icon name="share" />
                  <span>Share</span>
                </div>
              </div>
              <div className="flex items-center justify-center rounded-2xl border border-stroke-gray px-3 md:cursor-pointer dark:border-dark-gray dark:bg-dark">
                <Icon name="dots" />
              </div>
            </div>
            <div className="flex flex-col gap-3.5 rounded-xl border border-stroke-gray p-2.5 sm:border-none dark:border-dark-gray">
              <div className="flex flex-col gap-1 gap-3.5 rounded-xl border-stroke-gray p-1.5 sm:flex-row sm:border dark:border-dark-gray">
                <div className="flex flex-col gap-2 rounded-xl border bg-button-gray p-2.5 sm:w-full dark:border-none dark:bg-dark">
                  <p className="text-txt-gray">Auction ends in</p>
                  <p className="flex gap-2 text-2xl font-bold">
                    <span>{27}</span>:<span>{'08'}</span>:<span>{46}</span>
                  </p>
                  <p className="flex gap-7 text-txt-gray">
                    <span>hrs</span>
                    <span>min</span>
                    <span>sec</span>
                  </p>
                </div>
                <div className="flex flex justify-center gap-1 gap-2 rounded-xl sm:w-full sm:flex-col sm:border sm:bg-button-gray sm:p-2.5 dark:bg-dark sm:dark:border-none">
                  <p className="sm:text-txt-gray">Minimum bid</p>
                  <p className="font-bold sm:text-2xl">2.8 ASTR</p>
                  <p className="hidden text-txt-gray sm:block">2.8 ASTR</p>
                </div>
              </div>
              <div className="flex">
                <Button
                  onClick={() => showBidModal(true)}
                  color="black"
                  title={
                    <span className="flex items-center justify-center gap-1">
                      <Icon name="hummer" /> Bid
                    </span>
                  }
                  className="w-full rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-8">
        <Tabs
          config={tabsConfig}
          initialTab="Properties"
          className="mx-0"
          listContainerClass="md:border-none"
        />
      </div>
      {bidModal && <AuctionBidModal onClose={() => showBidModal(false)} />}
    </div>
  );
}
