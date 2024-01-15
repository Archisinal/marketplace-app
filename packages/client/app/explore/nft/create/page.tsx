import React from 'react';
import { getCollections } from '@/services';
import EnsureWalletConnected from '@/features/wallet-connect/components/EnsureWalletConnected';
import CreateNftForm from '@/features/nft/CreateNftForm';
import { getAccountKeyFromCookies } from '@/utils/auth-utils';

export default async function CreateNftPage() {
  const accountKey = getAccountKeyFromCookies();
  const ownerCollections = await getCollections({ owner: accountKey });

  return (
    <div className="p-3.5">
      <div className="rounded-2xl border border-stroke-gray p-2.5 dark:border-dark-gray md:mx-auto md:max-w-4xl md:p-8">
        <div className="pb-6 pt-5 text-2xl font-semibold md:hidden">
          CREATE NEW NFT
        </div>
        <EnsureWalletConnected accountKey={accountKey} />
        <CreateNftForm ownerCollections={ownerCollections} />
      </div>
    </div>
  );
}
