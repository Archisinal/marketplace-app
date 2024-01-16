'use client';

import { NFT } from '@archisinal/backend';
import { Icon, ImageComponent, Tabs } from '@/components';
import { NftItemAction, Properties } from '@/features/nft/index';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatAddress, formatIpfsLink } from '@/utils/formaters';
import { registerView } from '@/services';
import dayjs from 'dayjs';
import Link from 'next/link';
import { NodeContext } from '@/context';
import IdentIcon from '@/features/wallet-connect/components/Identicon';

function NftDetails({ nft }: { nft: NFT }) {
  const { subscanUrl } = useContext(NodeContext);
  const [fullImageSize, showFullImage] = useState(false);

  const router = useRouter();

  useEffect(() => {
    registerView(nft.id);
  }, []);

  const properties = {
    Editions: '-',
    'Minted at': dayjs(nft.minted_at).format('MMM DD, YYYY'),
    Creator: (
      <span className="flex items-center gap-2">
        <IdentIcon address={nft.creator} />
        {formatAddress(nft.creator)}
      </span>
    ),
    Royalty: nft.collection.royalty + '%',
    'ID in collection': '#' + nft.id_in_collection,
    'Collection Contract': (
      <span className="flex items-center gap-1">
        <Link
          href={`${subscanUrl}/account/${nft.collection.address}`}
          className="flex items-center gap-2"
        >
          <Icon name="arrowRightUp" />
          {formatAddress(nft.collection.address)}
        </Link>
      </span>
    ),
    'Project data': (
      <span className="flex items-center gap-1">
        <Link
          href={formatIpfsLink(nft?.metadata || '')}
          className="flex items-center gap-2"
        >
          <Icon name="arrowRightUp" />
          IPFS
        </Link>
      </span>
    ),
  };

  const tabsConfig = [
    { label: 'Properties', component: () => <Properties data={properties} /> },
  ];

  return (
    <>
      {fullImageSize && (
        <>
          <div
            className="absolute left-0 top-0 z-10 h-screen w-screen bg-dark opacity-80"
            onClick={() => showFullImage(false)}
          ></div>
          <div
            onClick={() => showFullImage(false)}
            className="absolute left-2/4 right-0 top-2/4 z-10 h-4/5 w-4/5 -translate-x-2/4 -translate-y-2/4 rounded-2xl border border-stroke-gray dark:border-dark-gray"
          >
            <ImageComponent
              fill={true}
              src="/mockAssets/3.jpg"
              className="z-10 h-full w-full rounded-2xl object-cover"
            />
          </div>
        </>
      )}

      {/* Mobile/Tablet screen */}
      <div className="md:hidden">
        <div className="grid-cols-2 gap-7 md:grid">
          <div className="relative mb-6 rounded-2xl border border-stroke-gray dark:border-dark-gray">
            <div className="aspect-video p-2.5 sm:p-5">
              <ImageComponent
                fill={true}
                src={formatIpfsLink(nft.img_url)}
                className="h-full w-full  rounded-2xl object-cover"
              />
            </div>
            <span
              onClick={() => showFullImage(true)}
              className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-lg bg-black-rus sm:right-10 sm:top-10 "
            >
              <Icon name="zoomin" />
            </span>
          </div>
          <NftItemAction
            nft={nft}
            onBackClick={() => router.back()}
            onButtonClick={() => {}}
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
                src={formatIpfsLink(nft.img_url)}
                className="h-full w-full  rounded-2xl object-cover"
              />
            </div>
            <span
              onClick={() => showFullImage(true)}
              className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-lg bg-black-rus sm:right-10 sm:top-10 "
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
          nft={nft}
          onBackClick={() => router.back()}
          onButtonClick={() => {}}
        />
      </div>
    </>
  );
}

export default NftDetails;
