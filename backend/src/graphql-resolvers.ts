import {Resolver, Query, Arg, ID} from 'type-graphql';
import { PrismaClient } from '@prisma/client';
import { Listing, NFT, User, Collection, Auction } from './graphql-types';

const prisma = new PrismaClient();

@Resolver()
class MyResolver {
    @Query(() => [Listing])
    async listings(): Promise<Listing[]> {
        // @ts-ignore
        return prisma.listing.findMany();
    }

    @Query(() => Listing, { nullable: true })
    async listing(@Arg('id', () => ID) id: string): Promise<Listing | null> {
        // @ts-ignore
        return prisma.listing.findUnique({where: {id}});
    }

    @Query(() => [NFT])
    async nfts(): Promise<NFT[]> {
        // @ts-ignore
        return prisma.nFT.findMany();
    }

    @Query(() => NFT, { nullable: true })
    async nft(@Arg('id', () => ID) id: string): Promise<NFT | null> {
        // @ts-ignore
        return prisma.nFT.findUnique({where: {id}});
    }

    @Query(() => [User])
    async users(): Promise<User[]> {
        // @ts-ignore
        return prisma.user.findMany();
    }

    @Query(() => User, { nullable: true })
    async user(@Arg('id', () => ID) id: string): Promise<User | null> {
        // @ts-ignore
        return prisma.user.findUnique({where: {id}});
    }

    @Query(() => [Collection])
    async collections(): Promise<Collection[]> {
        // @ts-ignore
        return prisma.collection.findMany();
    }

    @Query(() => Collection, { nullable: true })
    async collection(@Arg('id', () => ID) id: string): Promise<Collection | null> {
        // @ts-ignore
        return prisma.collection.findUnique({where: {id}});
    }
    @Query(() => [Auction])
    async auctions(): Promise<Auction[]> {
        // @ts-ignore
        return prisma.auction.findMany();
    }

    @Query(() => Auction, { nullable: true })
    async auction(@Arg('id', () => ID) id: string): Promise<Auction | null> {
        // @ts-ignore
        return prisma.auction.findUnique({where: {id}});
    }
}

export default MyResolver;
