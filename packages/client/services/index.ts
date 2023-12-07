'use server';
import { cardData } from '@/data/cardItems';
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
  getNFTsQuery,
  getUserByIdQuery,
  getUsersQuery,
} from './queries';

type TFetchQueryArgs = {
  path?: string;
  headers?: { [key: string]: string };
  query: string;
  variables?: { [key: string]: string };
};

async function fetchQuery({
  path = 'http://localhost:3001/graphql',
  headers,
  query,
  variables,
}: TFetchQueryArgs): Promise<any> {
  // const response = await fetch(path, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //     ...headers,
  //   },
  //   body: JSON.stringify({ query, variables }),
  // });
  // return await response.json();
  return {}
}

type TGetCollectionQueryParams = {
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
  pagination = {},
  orderBy = null,
  last_n = null,
}: TGetCollectionQueryParams) {
  'use server';
  const { pageNumber, pageSize = 10 } = pagination;
  const paginationParams = pageNumber ? `${pageNumber},${pageSize}` : '';
  const orderParams = orderBy ? `${orderBy.by}_${orderBy.order}` : null;

  const { data } = await fetchQuery({
    query: getCollectionsQuery({
      pagination: paginationParams,
      orderBy: orderParams,
      last_n,
    }),
  });
  //TODO: For test loading state only!
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // before BE will be ready
  return { data: cardData };
}

export async function getCollectionById(collectionId: string) {
  'use server';
  const { data } = await fetchQuery({
    query: getCollectionByIdQuery(collectionId),
  });

  return { data };
}

// NFT

type TGetNFTsParams = TGetCollectionQueryParams & {
  creator?: string;
  owner?: string;
  collection?: string;
};

export async function getNFTs({
  pagination = {},
  last_n,
  creator,
  owner,
  collection,
  orderBy,
}: TGetNFTsParams) {
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
    }),
  });

  return { data };
}

export async function getNFTById(nftId: string) {
  'use server';

  const { data } = await fetchQuery({ query: getNFTByIdQuery(nftId) });

  return { data };
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
