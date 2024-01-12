import React from 'react';
import {
  CollectionComponent,
  NftsCollectionComponent,
  Tabs,
} from '@/components';

const tabsConfig = [
  { label: 'Collections', component: CollectionComponent },
  { label: 'NFTs', component: NftsCollectionComponent },
];

export default function CollectionsPage({
  params,
}: {
  params: { tab: string };
}) {
  return (
    <div className="px-4 py-4 md:px-8">
      <Tabs config={tabsConfig} initialTab={params.tab} />
    </div>
  );
}
