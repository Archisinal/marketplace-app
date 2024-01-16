import React from 'react';
import { getNftById } from '@/services';
import NftDetails from '@/features/nft/NftDetails';

export default async function NftPage({ params }: { params: { id: string } }) {
  const nft = await getNftById(params.id);

  return (
    <div className="mx-auto px-4 py-4 sm:container md:px-8">
      <NftDetails nft={nft} />
    </div>
  );
}
