import React from 'react';
import { Tabs } from '@/components';
import CollectionItems from '@/features/nft/NftsCollectionComponent';
import EnsureWalletConnected from '@/features/wallet-connect/components/EnsureWalletConnected';
import ProfileHeader from '@/features/user/ProfileHeader';
import ProfileInfo from '@/features/user/ProfileInfo';
import { getAccountKeyFromCookies } from '@/utils/auth-utils';
import { getNFTs } from '@/services';

const tabsConfig = [
  { label: 'Owned', component: CollectionItems },
  { label: 'Sale', component: CollectionItems },
];

const ProfilePage = async ({ params }: { params: { tab: string } }) => {
  const accountKey = getAccountKeyFromCookies();
  const nfts = await getNFTs({ owner: accountKey });
  console.log(JSON.stringify(nfts, null, 2));
  return (
    <div className="flex flex-col gap-8 px-4 py-4 dark:text-txt-gray md:px-8">
      <EnsureWalletConnected />
      <ProfileHeader />
      <ProfileInfo />
      <div className="dark:text-white">
        <Tabs
          config={tabsConfig}
          initialTab={params.tab}
          relativePath="/user/sales"
        />
      </div>
    </div>
  );
};

export default ProfilePage;
