import React from "react";
import {
  Tabs,
  CollectionComponent,
  NftsCollectionComponent,
} from "../../components";

const Users = () => <div>Users</div>;

const tabsConfig = [
  { label: "Collections", component: CollectionComponent },
  { label: "NFTs", component: NftsCollectionComponent },
  { label: "Users", component: Users },
];

export default function CollectionsPage() {
  return <Tabs config={tabsConfig} initialTab="Collections" />;
}
