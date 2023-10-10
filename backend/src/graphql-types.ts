import { ObjectType, Field, ID } from 'type-graphql';
import 'reflect-metadata';
import {GraphQLString} from "graphql";

@ObjectType()
class Listing {
    @Field(() => ID)
    id!: string;

    @Field(() => ID)
    listing_id!: string;

    @Field()
    creator!: string;

    @Field()
    collection!: string;

    @Field()
    token_id!: string;

    @Field()
    price!: string;

    @Field()
    status!: string;

    @Field()
    created_at!: Date;

    @Field(() => ID, { nullable: true })
    winner!: string;

    @Field()
    currency!: boolean;

    @Field({ nullable: true })
    psp22_addr?: string;
}

@ObjectType()
class NFT {
    @Field(() => ID)
    id!: string;

    @Field()
    owner!: string;

    @Field()
    creator!: string;

    @Field(() => ID)
    id_in_collection!: string;

    @Field()
    collection!: string;

    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    description?: string;

    @Field()
    minted_at!: Date;

    @Field(() => GraphQLString, { nullable: true })
    metadata?: string;
}

@ObjectType()
class User {
    @Field(() => ID)
    id!: string;

    @Field()
    address!: string;

    @Field()
    is_creator!: boolean;

    @Field({ nullable: true })
    nick?: string;

    @Field(() => ID, { nullable: true })
    avatar_id?: string;

    @Field({ nullable: true })
    avatar_address?: string;

    @Field({ nullable: true })
    avatar_uri?: string;

    @Field(() => GraphQLString, { nullable: true })
    metadata?: string;
}

@ObjectType()
class Collection {
    @Field(() => ID)
    id!: string;

    @Field()
    address!: string;

    @Field()
    collection_name!: string;

    @Field()
    royalty!: string;

    @Field()
    created_at!: Date;

    @Field()
    collection_owner_address!: string;

    @Field()
    collection_owner!: string;

    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    uri?: string;

    @Field(() => GraphQLString, { nullable: true })
    metadata?: string;
}

@ObjectType()
class Auction {
    @Field(() => ID)
    id!: string;

    @Field()
    auction_owner!: string;

    @Field()
    auction_creator!: string;

    @Field()
    start_price!: string;

    @Field()
    min_bid_step!: string;

    @Field()
    created_at!: Date;

    @Field()
    start_time!: Date;

    @Field()
    end_time!: Date;

    @Field({ nullable: true })
    winner?: string;

    @Field()
    token_id!: string;

    @Field()
    collection!: string;

    @Field()
    currency!: boolean;

    @Field({ nullable: true })
    psp22_addr?: string;
}

export { Listing, NFT, User, Collection, Auction };
