import React from 'react';
import { getNftById } from '@/services';
import NftDetails from '@/features/nft/NftDetails';

export default async function NftPage({ params }: { params: { id: string } }) {
  const nft = await getNftById(params.id);
  console.log(nft);

  return (
    <div className="container mx-auto px-4 py-4 md:px-8">
      <NftDetails nft={nft} />
    </div>
  );
}
