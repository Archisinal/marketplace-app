import React from 'react';
import { CollectionList, NftList, Tabs } from '@/components';
import { Collection, NFT } from '@archisinal/backend';
import { getCollections, getNFTsOnSale } from '@/services';

const tabsConfig = [
  { label: 'Collections', component: CollectionList },
  { label: 'NFTs', component: NftList },
];

export default async function CollectionsPage({
  params,
}: {
  params: { tab: string };
}) {
  let nfts: NFT[] = [];
  let collections: Collection[] = [];

  if (params.tab === 'nfts') {
    nfts = await getNFTsOnSale();
  } else if (params.tab === 'collections') {
    collections = await getCollections();
  }

  return (
    <div className="px-4 py-4 md:px-8">
      <Tabs
        config={tabsConfig}
        initialTab={params.tab}
        componentProps={{ nfts, collections }}
      />
    </div>
  );
}
