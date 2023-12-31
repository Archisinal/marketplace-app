import React from 'react';
import {
  CollectionComponent,
  NftsCollectionComponent,
  Tabs,
} from '../../../components';

const tabsConfig = [
  { label: 'Collections', component: CollectionComponent },
  { label: 'NFTs', component: NftsCollectionComponent },
  // { label: 'Users', component: UsersCollectionComponent },
];

export default function CollectionsPage({
  params,
}: {
  params: { tab: string };
}) {
  return (
    <>
      <Tabs config={tabsConfig} initialTab={params.tab} />
    </>
  );
}
