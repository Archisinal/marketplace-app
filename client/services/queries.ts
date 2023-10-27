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
`
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