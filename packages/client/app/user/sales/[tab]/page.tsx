import React from 'react';
import { Tabs } from '@/components';
import CollectionItems from '@/features/nft/NftsCollectionComponent';
import EnsureWalletConnected from '@/features/wallet-connect/components/EnsureWalletConnected';
import ProfileHeader from '@/features/user/ProfileHeader';
import ProfileInfo from '@/features/user/ProfileInfo';
import { getAccountKeyFromCookies } from '@/utils/auth-utils';
import { getNftCounts, getNFTs, getNFTsOnSale } from '@/services';
import { NFT, NFTCounts } from '@archisinal/backend';

const ProfilePage = async ({
  params,
  searchParams,
}: {
  params: { tab: string };
  searchParams?: {
    categories?: string;
  };
}) => {
  const accountKey = getAccountKeyFromCookies();
  let nfts: NFT[] = [];

  const counts: NFTCounts = accountKey
    ? await getNftCounts({ owner: accountKey })
    : { owned: 0, on_sale: 0, created: 0 };

  if (params.tab.startsWith('owned')) {
    nfts = await getNFTs({
      owner: accountKey,
      ...searchParams,
    });
  } else if (params.tab.startsWith('selling')) {
    nfts = await getNFTsOnSale({
      creator: accountKey,
      ...searchParams,
    });
  } else if (params.tab.startsWith('created')) {
    nfts = await getNFTs({
      creator: accountKey,
      ...searchParams,
    });
  }

  return (
    <div className="flex flex-col gap-8 px-4 py-4 dark:text-txt-gray md:px-8">
      <EnsureWalletConnected accountKey={accountKey} />
      <ProfileHeader />
      <ProfileInfo />
      <div className="dark:text-white">
        <Tabs
          config={[
            {
              label: 'Owned',
              component: CollectionItems,
              count: counts.owned,
            },
            {
              label: 'Selling',
              component: CollectionItems,
              count: counts.on_sale,
            },
            {
              label: 'Created',
              component: CollectionItems,
              count: counts.created,
            },
          ]}
          initialTab={params.tab}
          relativePath="/user/sales"
          componentProps={{ nfts }}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
