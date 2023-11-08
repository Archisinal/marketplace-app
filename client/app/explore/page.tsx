import React from 'react';
import {
  CollectionComponent,
  NftsCollectionComponent,
  Tabs,
  UsersCollectionComponent,
} from '../../components';

const tabsConfig = [
  { label: 'Collections', component: CollectionComponent },
  { label: 'NFTs', component: NftsCollectionComponent },
  { label: 'Users', component: UsersCollectionComponent },
];

export default function CollectionsPage() {
  return (
    <>
      <Tabs config={tabsConfig} initialTab="Collections" />
    </>
  );
}
