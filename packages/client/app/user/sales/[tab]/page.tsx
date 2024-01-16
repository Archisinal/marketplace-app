import React from 'react';
import { Tabs } from '@/components';
import CollectionItems from '@/features/nft/NftsCollectionComponent';
import EnsureWalletConnected from '@/features/wallet-connect/components/EnsureWalletConnected';
import ProfileHeader from '@/features/user/ProfileHeader';
import ProfileInfo from '@/features/user/ProfileInfo';
import { getAccountKeyFromCookies } from '@/utils/auth-utils';
import { getNFTs, getNFTsOnSale } from '@/services';
import { NFT } from '@archisinal/backend';

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
  const ownedNFTS = await getNFTs({
    owner: accountKey,
    ...searchParams,
  });
  const sellingNFTS = await getNFTsOnSale({
    creator: accountKey,
    ...searchParams,
  });
  const createdNFTS = await getNFTs({
    creator: accountKey,
    ...searchParams,
  });

  console.log(params.tab);

  if (params.tab.startsWith('owned')) {
    nfts = ownedNFTS;
  } else if (params.tab.startsWith('selling')) {
    nfts = sellingNFTS;
  } else if (params.tab.startsWith('created')) {
    nfts = createdNFTS;
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
              count: ownedNFTS.length,
            },
            {
              label: 'Selling',
              component: CollectionItems,
              count: sellingNFTS.length,
            },
            {
              label: 'Created',
              component: CollectionItems,
              count: createdNFTS.length,
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
