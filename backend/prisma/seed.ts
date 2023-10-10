import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.user.createMany({
        data: [
            {
                address: "user1_address",
                is_creator: true,
                nick: "User 1",
                avatar_id: 1,
                avatar_address: "avatar_address_1",
                avatar_uri: "avatar_uri_1",
                metadata: "User 1 Metadata",
            },
            {
                address: "user2_address",
                is_creator: false,
                nick: "User 2",
                avatar_id: 2,
                avatar_address: "avatar_address_2",
                avatar_uri: "avatar_uri_2",
                metadata: "User 2 Metadata",
            },
        ],
    });

    await prisma.collection.createMany({
        data: [
            {
                address: "collection1_address",
                collection_name: "Collection 1",
                royalty: 10,
                created_at: new Date(),
                collection_owner_address: "collection_owner_address_1",
                collection_owner: "collection_owner_1",
                name: "Collection 1 Name",
                uri: "collection_uri_1",
                metadata: "Collection 1 Metadata",
            },
            {
                address: "collection2_address",
                collection_name: "Collection 2",
                royalty: 5,
                created_at: new Date(),
                collection_owner_address: "collection_owner_address_2",
                collection_owner: "collection_owner_2",
                name: "Collection 2 Name",
                uri: "collection_uri_2",
                metadata: "Collection 2 Metadata",
            },
        ],
    });

    await prisma.listing.createMany({
        data: [
            {
                listing_id: 1,
                creator: "user1_address",
                collection: "collection1_address",
                token_id: 1,
                price: 100,
                status: "active",
                created_at: new Date(),
                winner: null,
                currency: false,
                psp22_addr: null,
            },
            {
                listing_id: 2,
                creator: "user2_address",
                collection: "collection2_address",
                token_id: 2,
                price: 200,
                status: "active",
                created_at: new Date(),
                winner: null,
                currency: true,
                psp22_addr: "psp22_address_1",
            },
        ],
    });

    await prisma.nFT.createMany({
        data: [
            {
                owner: "user1_address",
                creator: "user1_address",
                id_in_collection: 1,
                collection: "collection1_address",
                name: "NFT 1",
                description: "Description for NFT 1",
                minted_at: new Date(),
                metadata: "NFT 1 Metadata",
            },
            {
                owner: "user2_address",
                creator: "user2_address",
                id_in_collection: 2,
                collection: "collection2_address",
                name: "NFT 2",
                description: "Description for NFT 2",
                minted_at: new Date(),
                metadata: "NFT 2 Metadata",
            },
        ],
    });

    await prisma.auction.createMany({
        data: [
            {
                auction_owner: "user1_address",
                auction_creator: "user1_address",
                start_price: 150,
                min_bid_step: 10,
                created_at: new Date(),
                start_time: new Date(),
                end_time: new Date(),
                winner: null,
                token_id: 1,
                collection: "collection1_address",
                currency: false,
                psp22_addr: null,
            },
            {
                auction_owner: "user2_address",
                auction_creator: "user2_address",
                start_price: 250,
                min_bid_step: 20,
                created_at: new Date(),
                start_time: new Date(),
                end_time: new Date(),
                winner: null,
                token_id: 2,
                collection: "collection2_address",
                currency: true,
                psp22_addr: "psp22_address_2",
            },
        ],
    });

    console.log("Seed data inserted successfully!");

    await prisma.$disconnect();
}

main().catch((e) => {
    throw e;
});
