import React from 'react';
import NftList from '@/features/nft/NftList';
import { getCollectionById } from '@/services';
import CollectionHeader from '@/features/collection/CollectionHeader';
import CollectionInfo from '@/features/collection/CollectionInfo';

const CollectionItemPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: {
    categories?: string;
  };
}) => {
  const collection = await getCollectionById(params.id);
  const nfts = searchParams?.categories
    ? collection?.nfts?.filter((nft) =>
        searchParams.categories
          ?.split(',')
          .some((category) => nft?.categories?.includes(category)),
      )
    : collection?.nfts;

  return (
    <div className="flex flex-col px-4 py-4 dark:text-txt-gray md:px-8">
      <div className="mb-4 flex flex-col gap-8">
        <CollectionHeader collection={collection} />
        <CollectionInfo collection={collection} />
      </div>
      <div className="min-h-[calc(100vh-260px)] dark:text-white sm:min-h-[calc(100vh-220px)]">
        <NftList nfts={nfts} />
      </div>
    </div>
  );
};

export default CollectionItemPage;
