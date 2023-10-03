import React from "react";
import { Tabs, CollectionComponent } from "../../components";

const Collections = () => <div>Collections</div>;
const NFTs = () => <div>NFTs</div>;
const Users = () => <div>Users</div>;

const tabsConfig = [
  { label: "Collections", component: CollectionComponent },
  { label: "NFTs", component: NFTs },
  { label: "Users", component: Users },
];

export default function CollectionsPage() {
  return <Tabs config={tabsConfig} initialTab="Collections" />;
}
