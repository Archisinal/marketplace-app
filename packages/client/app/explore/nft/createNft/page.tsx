import React from 'react';
import CreateNftForm from '@/features/nft/CreateNftForm';
import { getCollections } from '@/services';
import { cookies } from 'next/headers';
import EnsureWalletConnected from '@/features/wallet-connect/components/EnsureWalletConnected';

export default async function CreateNftPage() {
  const cookieStore = cookies();
  const accountKey = cookieStore
    .getAll()
    .find((cookie) => cookie.name === 'accountKey');
  const ownerCollections = await getCollections({ owner: accountKey?.value });

  return (
    <div className="p-3.5">
      <div className="rounded-2xl border border-stroke-gray p-2.5 dark:border-dark-gray md:mx-auto md:max-w-4xl md:p-8">
        <div className="pb-6 pt-5 text-2xl font-semibold md:hidden">
          CREATE NEW NFT
        </div>
        <EnsureWalletConnected />
        <CreateNftForm ownerCollections={ownerCollections} />
      </div>
    </div>
  );
}
