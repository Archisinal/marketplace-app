type TQueryString = string | null;
type TQueryNumber = number | null;

export const GET_COLLECTIONS = `
    query Collections {
        collections {
            id
            address
            collection_name
            royalty
            created_at
            collection_owner_address
            collection_owner
            name
            uri
            metadata
        }
    }
`;

export const GET_COLLECTION = `
    query Collection ($id: String!) {
        collection(id: $id) {
            id
            address
            collection_name
            royalty
            created_at
            collection_owner_address
            collection_owner
            name
            uri
            metadata
        }
    }

`;
type TGetCollectionQueryParams = {
  owner?: TQueryString;
  pagination?: TQueryString;
  last_n?: TQueryNumber;
  orderBy: TQueryString;
};

type TGetListingsQueryParams = TGetCollectionQueryParams & {
  price_range: TQueryString;
};

export const getCollectionsQuery = ({
  owner,
  pagination,
  orderBy,
  last_n,
}: TGetCollectionQueryParams) => {
  return `
    query Collections {
        collections(
          ${pagination ? `, pagination: "${pagination}"` : ''} 
          ${last_n ? `, last_n: "${last_n}"` : ''} 
          ${orderBy ? `, orderBy: "${orderBy}"` : ''} 
          ${owner ? `, owner: "${owner}"` : ''}
        ) {
            address
            royalty
            created_at
            collection_owner_address
            collection_owner
            name
            uri
            metadata
        }
    }
    `;
};

export const getListingsQuery = ({
  pagination,
  orderBy,
  last_n,
  price_range,
}: TGetListingsQueryParams) => {
  return `
    query Listings {
        listings(pagination: "${pagination}", last_n: ${last_n}, orderBy: "${orderBy}", price_range: "${price_range}") {
            id
            listing_id
            creator
            collection
            token_id
            price
            status
            created_at
            winner
            currency
            psp22_addr
        }
    }
 `;
};

type TGetAuctionsQueryParams = TGetCollectionQueryParams & {
  status: TQueryString;
};

export const getAuctionsQuery = ({
  pagination,
  orderBy,
  last_n,
  status,
}: TGetAuctionsQueryParams) => {
  return `
    query Auctions {
        auctions(pagination: "${pagination}", last_n: ${last_n}, orderBy: "${orderBy}", price_range: "${status}") {
            id
            auction_owner
            auction_creator
            start_price
            min_bid_step
            created_at
            start_time
            end_time
            winner
            token_id
            collection
            currency
            psp22_addr
        }
    }
    
    `;
};

export const getAuctionByIdQuery = (auctionId: string) => {
  return `
    query Auction {
        auction(id: ${auctionId}) {
            id
            auction_owner
            auction_creator
            start_price
            min_bid_step
            created_at
            start_time
            end_time
            winner
            token_id
            collection
            currency
            psp22_addr
        }
    }
    
    `;
};

export const getListingByIdQuery = (listingId: string) => {
  return `
    query Listing {
        listing(id: ${listingId}) {
            id
            listing_id
            creator
            collection
            token_id
            price
            status
            created_at
            winner
            currency
            psp22_addr
        }
    }
    
    `;
};

export const getUsersQuery = ({
  pagination,
  orderBy,
  last_n,
}: TGetCollectionQueryParams) => {
  return `
    query Users {
        users(pagination: "${pagination}", last_n: ${last_n}, orderBy: "${orderBy}") {
            id
            address
            is_creator
            nick
            avatar_id
            avatar_address
            avatar_uri
            metadata
        }
    }
    
    `;
};

export const getUserByIdQuery = (userId: string) => {
  return `
    query User {
        user(id: ${userId}) {
            id
            address
            is_creator
            nick
            avatar_id
            avatar_address
            avatar_uri
            metadata
        }
    }
    
    `;
};

export const getCollectionByIdQuery = (collectionId: string) => {
  return `
    query Collection {
        collection(id: ${collectionId}) {
            address
            royalty
            created_at
            collection_owner_address
            collection_owner
            name
            uri
            metadata
        }
    }
`;
};

type TGgetNFTsQueryParam = {
  pagination?: TQueryString;
  last_n?: TQueryNumber;
  creator?: TQueryString;
  owner?: TQueryString;
  collection?: TQueryString;
  orderBy: TQueryString;
  categories?: TQueryString;
};

export const getNFTsQuery = ({
  pagination,
  last_n,
  creator,
  owner,
  collection,
  orderBy,
  categories,
}: TGgetNFTsQueryParam) => {
  return `
    query Nfts {
        nfts(
          ${pagination ? `, pagination: "${pagination}"` : ''} 
          ${last_n ? `, last_n: "${last_n}"` : ''} 
          ${orderBy ? `, orderBy: "${orderBy}"` : ''} 
          ${owner ? `, owner: "${owner}"` : ''}
          ${creator ? `, creator: "${creator}"` : ''}
          ${collection ? `, collection: "${collection}"` : ''}
          ${categories ? `, categories: "${categories}"` : ''}
        ) {
            id
            owner
            creator
            id_in_collection
            collection {
              address
              royalty
              created_at
              collection_owner_address
              collection_owner
              name
              uri
              metadata
            }
            categories
            img_url
            name
            description
            minted_at
            metadata
        }
    }
    
    `;
};

export const getNFTByIdQuery = (nftId: string) => {
  return `
    query Nft {
        nft(id: ${nftId}) {
            id
            owner
            creator
            id_in_collection
            collection {
              address
              royalty
              created_at
              collection_owner_address
              collection_owner
              name
              uri
              metadata
            }
            categories
            img_url
            name
            description
            minted_at
            metadata
            views
        }
    }     
    `;
};

export const GET_AUCTIONS = `
    query Auctions {
        auctions {
            id
            auction_owner
            auction_creator
            start_price
            min_bid_step
            created_at
            start_time
            end_time
            winner
            token_id
            collection
            currency
            psp22_addr
        }
    }
`;
