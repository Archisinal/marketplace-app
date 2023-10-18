import {Resolver, Query, Arg, ID} from 'type-graphql';
import { PrismaClient } from '@prisma/client';
import { Listing, NFT, User, Collection, Auction } from './graphql-types';

const prisma = new PrismaClient();

function bigintToString(value: bigint | null): string | null {
    return value ? value.toString() : null;
}

function stringToBigint(value: string | null): bigint | null {
    return value ? BigInt(value) : null;
}

@Resolver()
class MyResolver {
    @Query(() => [Listing])
    async listings(): Promise<Listing[]> {
        const listings = await prisma.listing.findMany();

        console.log(listings);

        return listings.map((listing) => {
            return {
                ...listing,
                id: bigintToString(listing.id)!,
                listing_id: bigintToString(listing.listing_id)!,
                token_id: bigintToString(listing.token_id)!,
                price: bigintToString(listing.price)!,
                winner: bigintToString(listing.winner)
            };
        });
    }

    @Query(() => Listing, { nullable: true })
    async listing(@Arg('id', () => ID) id: string): Promise<Listing | null> {
        const listing = await prisma.listing.findUnique({where: {id: stringToBigint(id)!}});

        if (!listing) {
            return null;
        }

        return {
            ...listing,
            id: bigintToString(listing.id)!,
            listing_id: bigintToString(listing.listing_id)!,
            token_id: bigintToString(listing.token_id)!,
            price: bigintToString(listing.price)!,
            winner: bigintToString(listing.winner)
        }
    }

    @Query(() => [NFT])
    async nfts(): Promise<NFT[]> {
        const nfts = await prisma.nFT.findMany();

        return nfts.map((nft) => {
            return {
                ...nft,
                id: bigintToString(nft.id)!,
                id_in_collection: bigintToString(nft.id_in_collection)!,
                name: nft.name! || null
            }
        })
    }

    @Query(() => NFT, { nullable: true })
    async nft(@Arg('id', () => ID) id: string): Promise<NFT | null> {
        const nft = await prisma.nFT.findUnique({where: {id: stringToBigint(id)!}});

        if (!nft) {
            return null;
        }

        return {
            ...nft,
            id: bigintToString(nft.id)!,
            id_in_collection: bigintToString(nft.id_in_collection)!,
            name: nft.name! || null
        }
    }

    @Query(() => [User])
    async users(): Promise<User[]> {
        const users = await prisma.user.findMany();

        return users.map((user) => {
            return {
                ...user,
                id: bigintToString(user.id)!,
                avatar_id: bigintToString(user.avatar_id)!,
            }
        })
    }

    @Query(() => User, { nullable: true })
    async user(@Arg('id', () => ID) id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({where: {id: stringToBigint(id)!}});

        if (!user) {
            return null;
        }

        return {
            ...user,
            id: bigintToString(user.id)!,
            avatar_id: bigintToString(user.avatar_id)!,
        }
    }

    @Query(() => [Collection])
    async collections(): Promise<Collection[]> {
        const collections = await prisma.collection.findMany();

        return collections.map((collection) => {
            return {
                ...collection,
                id: bigintToString(collection.id)!,
                royalty: bigintToString(collection.royalty)!,
            }
        });
    }

    @Query(() => Collection, { nullable: true })
    async collection(@Arg('id', () => ID) id: string): Promise<Collection | null> {
        const collection = await prisma.collection.findUnique({where: {id: stringToBigint(id)!}});

        if (!collection) {
            return null;
        }

        return {
            ...collection,
            id: bigintToString(collection.id)!,
            royalty: bigintToString(collection.royalty)!,
        }
    }
    @Query(() => [Auction])
    async auctions(): Promise<Auction[]> {
        const auctions = await prisma.auction.findMany();

        return auctions.map((auction) => {
            return {
                ...auction,
                id: bigintToString(auction.id)!,
                start_price: bigintToString(auction.start_price)!,
                min_bid_step: bigintToString(auction.min_bid_step)!,
                token_id: bigintToString(auction.token_id)!,
            }
        })
    }

    @Query(() => Auction, { nullable: true })
    async auction(@Arg('id', () => ID) id: string): Promise<Auction | null> {
        const auction = await prisma.auction.findUnique({where: {id: stringToBigint(id)!}});

        if (!auction) {
            return null;
        }

        return {
            ...auction,
            id: bigintToString(auction.id)!,
            start_price: bigintToString(auction.start_price)!,
            min_bid_step: bigintToString(auction.min_bid_step)!,
            token_id: bigintToString(auction.token_id)!,
        }
    }
}

export default MyResolver;
