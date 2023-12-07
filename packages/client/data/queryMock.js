import { gql } from '@apollo/client';
import { collectionData } from './collectionData';

export const GET_COLLECTION_LIST = gql`
  query GetCollectionList {
    collections {
      itemName
      itemImg
      floorPrice
      currency
      floorChange
      volume
      sales
      items
      owners
      collectionItems {
        name
        company
        price {
          value
          currency
        }
        volume24h
        endIn
        itemImg
        total {
          value
          dif
        }
      }
    }
  }
`;

export const responseMocks = [
  {
    request: {
      query: GET_COLLECTION_LIST,
      variables: {},
    },
    result: {
      data: {
        collections: collectionData,
      },
    },
    delay: 2000,
  },
];
