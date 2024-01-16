import React from 'react';
import {
  CollectionComponent,
  NftsCollectionComponent,
  Tabs,
} from '@/components';
import { Collection, Collections, NFT } from '@archisinal/backend';
import { getNFTsOnSale } from '@/services';

const tabsConfig = [
  { label: 'Collections', component: CollectionComponent },
  { label: 'NFTs', component: NftsCollectionComponent },
];

export default async function CollectionsPage({
  params,
}: {
  params: { tab: string };
}) {
  let nfts: NFT[] = [];

  if (params.tab === 'nfts') {
    nfts = await getNFTsOnSale();
  }

  return (
    <div className="px-4 py-4 md:px-8">
      <Tabs
        config={tabsConfig}
        initialTab={params.tab}
        componentProps={{ nfts }}
      />
    </div>
  );
}
