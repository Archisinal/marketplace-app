'use server';
import { categories } from '@/data/categoryItems';
import { auctionData } from '@/data/auctionItems';
import {
  getAuctionByIdQuery,
  getAuctionsQuery,
  getCollectionByIdQuery,
  getCollectionsQuery,
  getListingByIdQuery,
  getListingsQuery,
  getNFTByIdQuery,
  getNftCountsQuery,
  getNFTsOnSaleQuery,
  getNFTsQuery,
  getUserByIdQuery,
  getUsersQuery,
  TGetNFTCountsQueryParam,
} from './queries';
import { Collection, NFT, NFTCounts } from '@archisinal/backend';

type TFetchQueryArgs = {
  path?: string;
  headers?: { [key: string]: string };
  query: string;
  variables?: { [key: string]: string };
};

async function fetchQuery({
  path = process.env.NEXT_PUBLIC_BACKEND_URL + '/graphql',
  headers,
  query,
  variables,
}: TFetchQueryArgs): Promise<any> {
  try {
    const response = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        ...headers,
      },
      body: JSON.stringify({ query, variables }),
      cache: 'no-cache',
    });
    return await response.json();
  } catch (e) {
    console.error(e);
    return {};
  }
}

type TGetCollectionQueryParams = {
  owner?: string;
  pagination?: { pageNumber?: number; pageSize?: number };
  last_n?: number | null;
  orderBy?: { by: string; order: 'asc' | 'desc' } | null;
};

// Listings

type TGetListingsQueryParams = TGetCollectionQueryParams & {
  price_range?: { from: number; to: number } | null;
};

export async function getListings({
  pagination = {},
  orderBy = null,
  last_n = null,
  price_range = null,
}: TGetListingsQueryParams) {
  'use server';
  const { pageNumber, pageSize = 10 } = pagination;
  const paginationParams = pageNumber ? `${pageNumber},${pageSize}` : '';
  const orderParams = orderBy ? `${orderBy.by}_${orderBy.order}` : null;
  const priceParams = price_range
    ? `${price_range.from}-${price_range.to}`
    : null;

  const { data } = await fetchQuery({
    query: getListingsQuery({
      pagination: paginationParams,
      orderBy: orderParams,
      last_n,
      price_range: priceParams,
    }),
  });
  //TODO: For test loading state only!
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { data };
}

export async function getListingById(listingId: string) {
  const { data } = await fetchQuery({ query: getListingByIdQuery(listingId) });

  return { data };
}

// Auctions

type TGetAuctionsQueryParams = TGetCollectionQueryParams & {
  status?: string | null;
};

export async function getAuctions({
  pagination = {},
  orderBy = null,
  last_n = null,
  status = null,
}: TGetAuctionsQueryParams) {
  'use server';
  const { pageNumber, pageSize = 10 } = pagination;
  const paginationParams = pageNumber ? `${pageNumber},${pageSize}` : '';
  const orderParams = orderBy ? `${orderBy.by}_${orderBy.order}` : null;

  const { data } = await fetchQuery({
    query: getAuctionsQuery({
      pagination: paginationParams,
      orderBy: orderParams,
      last_n,
      status,
    }),
  });
  //TODO: For test loading state only!
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { data: auctionData };
}

export async function getAuctionById(auctionId: string) {
  const { data } = await fetchQuery({ query: getAuctionByIdQuery(auctionId) });

  return { data };
}

// Collections

export async function getCollections({
  owner = '',
  pagination = {},
  orderBy = null,
  last_n = null,
}: TGetCollectionQueryParams = {}): Promise<Collection[]> {
  'use server';
  const { pageNumber, pageSize = 10 } = pagination;
  const paginationParams = pageNumber ? `${pageNumber},${pageSize}` : null;
  const orderParams = orderBy ? `${orderBy.by}_${orderBy.order}` : null;

  const { data } = await fetchQuery({
    query: getCollectionsQuery({
      owner,
      pagination: paginationParams,
      orderBy: orderParams,
      last_n,
    }),
  });

  return data?.collections || [];
}

export async function getCollectionById(
  collectionId: string,
): Promise<Collection> {
  'use server';
  const { data } = await fetchQuery({
    query: getCollectionByIdQuery(collectionId),
  });

  return data?.collection || {};
}

// NFT

type TGetNFTsParams = TGetCollectionQueryParams & {
  creator?: string;
  owner?: string;
  collection?: string;
  categories?: string;
};

export async function getNFTs({
  pagination = {},
  last_n,
  creator,
  owner,
  collection,
  orderBy,
  categories,
}: TGetNFTsParams): Promise<NFT[]> {
  'use server';
  const { pageNumber, pageSize = 10 } = pagination;
  const paginationParams = pageNumber ? `${pageNumber},${pageSize}` : '';
  const orderParams = orderBy ? `${orderBy.by}_${orderBy.order}` : null;

  const { data } = await fetchQuery({
    query: getNFTsQuery({
      pagination: paginationParams,
      orderBy: orderParams,
      last_n,
      creator,
      owner,
      collection,
      categories,
    }),
  });

  return data?.nfts || [];
}

export async function getNFTsOnSale({
  pagination = {},
  last_n,
  creator,
  collection,
  orderBy,
  categories,
}: TGetNFTsParams = {}): Promise<NFT[]> {
  'use server';
  const paginationParams =
    pagination?.pageNumber && pagination.pageSize
      ? `${pagination?.pageNumber},${pagination.pageSize}`
      : null;
  const orderParams = orderBy ? `${orderBy.by}_${orderBy.order}` : null;

  const { data } = await fetchQuery({
    query: getNFTsOnSaleQuery({
      pagination: paginationParams,
      orderBy: orderParams,
      last_n,
      creator,
      collection,
      categories,
    }),
  });

  console.log(
    getNFTsOnSaleQuery({
      pagination: paginationParams,
      orderBy: orderParams,
      last_n,
      creator,
      collection,
      categories,
    }),
  );

  return data?.nfts_on_sale || [];
}

export async function getNftCounts({
  owner,
}: TGetNFTCountsQueryParam): Promise<NFTCounts> {
  'use server';
  const { data } = await fetchQuery({
    query: getNftCountsQuery({
      owner,
    }),
  });

  return data?.nft_counts || [];
}

export async function getNftById(nftId: string) {
  'use server';

  const { data } = await fetchQuery({ query: getNFTByIdQuery(nftId) });

  return data?.nft || {};
}

// Users

type TGetUserQueryParam = TGetCollectionQueryParams;

export async function getUsers({
  pagination = {},
  orderBy = null,
  last_n = null,
}: TGetUserQueryParam) {
  'use server';
  const { pageNumber, pageSize = 10 } = pagination;
  const paginationParams = pageNumber ? `${pageNumber},${pageSize}` : '';
  const orderParams = orderBy ? `${orderBy.by}_${orderBy.order}` : null;

  const { data } = await fetchQuery({
    query: getUsersQuery({
      pagination: paginationParams,
      orderBy: orderParams,
      last_n,
    }),
  });
  //TODO: For test loading state only!
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { data };
}

export async function getUserById(userId: string) {
  'use server';

  const { data } = await fetchQuery({ query: getUserByIdQuery(userId) });
  return { data };
}

// Categories

export async function getCategories() {
  'use serve';
  //  Waiting for BE
  // const { data } = fetchQuery({ query: GET_CATEGORIES });

  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { data: categories };
}

export async function registerView(id: string) {
  'use server';
  const { data } = await fetchQuery({
    query: `
      mutation registerView($id: ID!) {
        registerView(id: $id)
      }
    `,
    variables: { id },
  });

  return data?.registerView;
}
