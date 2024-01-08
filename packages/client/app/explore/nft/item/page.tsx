'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon, ImageComponent, Tabs } from '@/components';
import { Properties, NftItemAction } from '@/features/nft';
import { AnimatePresence } from 'framer-motion';
import ConnectWalletModal from '@/features/wallet-connect/components/ConnectWalletModal';

const description =
  'Lorem Ipsum is simply dummy text of the printing and typesetting typesetting text typesetting industry dummy text of the printing and typesetting typesetting text typesetting industry';

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
];

export default function NftPage() {
  const [walletModal, showModal] = useState(false);
  const [fullImageSize, showFullImage] = useState(false);

  const router = useRouter();
  return (
    <div className="container mx-auto px-4">
      {fullImageSize && (
        <>
          <div className="absolute left-0 top-0 z-10 h-screen w-screen bg-dark opacity-80"></div>
          <div
            onClick={() => showFullImage(false)}
            className="absolute left-2/4 right-0 top-2/4 z-10 h-4/5 w-4/5 -translate-x-2/4 -translate-y-2/4 rounded-2xl border border-stroke-gray dark:border-dark-gray"
          >
            <ImageComponent
              fill={true}
              src="/mockAssets/3.png"
              className="z-10 h-full w-full rounded-2xl object-cover"
            />
          </div>
        </>
      )}

      {/* Mobile/Tablet screen */}
      <div className="md:hidden">
        <div className="grid-cols-2 gap-7 md:grid">
          <div className="relative rounded-2xl border border-stroke-gray dark:border-dark-gray">
            <div className="aspect-video p-2.5 sm:p-5">
              <ImageComponent
                fill={true}
                src="/mockAssets/3.png"
                className="h-full w-full  rounded-2xl object-cover"
              />
            </div>
            <span
              onClick={() => showFullImage(true)}
              className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-lg bg-stroke-gray/50 sm:right-10 sm:top-10 "
            >
              <Icon name="zoomin" />
            </span>
          </div>
          <NftItemAction
            description={description}
            onBackClick={() => router.back()}
            onButtonClick={() => showModal(true)}
          />
        </div>

        <div className="pt-8">
          <Tabs
            config={tabsConfig}
            initialTab="Properties"
            className="mx-0"
            listContainerClass="md:border-none"
          />
        </div>
      </div>

      {/* Desktop screen */}

      <div className="hidden grid-cols-2 gap-10 md:grid">
        <div className="md:grid">
          <div className="relative rounded-2xl border border-stroke-gray dark:border-dark-gray">
            <div className="aspect-video p-2.5 sm:p-5">
              <ImageComponent
                fill={true}
                src="/mockAssets/3.png"
                className="h-full w-full  rounded-2xl object-cover"
              />
            </div>
            <span
              onClick={() => showFullImage(true)}
              className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-lg bg-stroke-gray/50 sm:right-10 sm:top-10 "
            >
              <Icon name="zoomin" />
            </span>
          </div>
          <div className="pt-8">
            <Tabs
              config={tabsConfig}
              initialTab="Properties"
              className="mx-0"
              listContainerClass="md:border-none"
            />
          </div>
        </div>
        <NftItemAction
          description={description}
          onBackClick={() => router.back()}
          onButtonClick={() => showModal(true)}
        />
      </div>

      <AnimatePresence>
        {walletModal && (
          <ConnectWalletModal
            onConnected={() => {
              showModal(false);
            }}
            onClose={() => {
              showModal(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
