import {ObjectType, Field, ID, Int} from 'type-graphql';
import 'reflect-metadata';
import {GraphQLString, Kind} from "graphql";

@ObjectType()
class Listing {
    @Field(() => String)
    id!: string;

    @Field(() => String)
    listing_id!: string;

    @Field()
    creator!: string;

    @Field()
    collection!: string;

    @Field(() => String)
    token_id!: string;

    @Field(() => String)
    price!: string;

    @Field()
    status!: string;

    @Field(() => Date)
    created_at!: Date | null;

    @Field(() => String, { nullable: true })
    winner!: string | null;

    @Field()
    currency!: boolean;

    @Field(() => String, { nullable: true })
    psp22_addr?: string | null;
}

@ObjectType()
class NFT {
    @Field(() => String)
    id!: string;

    @Field()
    owner!: string;

    @Field()
    creator!: string;

    @Field(() => String)
    id_in_collection!: string;

    @Field()
    collection!: string;

    @Field(() => String, { nullable: true })
    name?: string | null;

    @Field(() => String, { nullable: true })
    description?: string | null;

    @Field(() => Date)
    minted_at!: Date;

    @Field(() => String, { nullable: true })
    metadata?: string | null;
}

@ObjectType()
class User {
    @Field(() => String)
    id!: string;

    @Field()
    address!: string;

    @Field()
    is_creator!: boolean;

    @Field(() => String, { nullable: true })
    nick?: string | null;

    @Field(() => String, { nullable: true })
    avatar_id?: string | null;

    @Field(() => String, { nullable: true })
    avatar_address?: string | null;

    @Field(() => String, { nullable: true })
    avatar_uri?: string | null;

    @Field(() => String, { nullable: true })
    metadata?: string | null;
}

@ObjectType()
class Collection {
    @Field(() => String)
    id!: string;

    @Field()
    address!: string;

    @Field()
    collection_name!: string;

    @Field()
    royalty!: string;

    @Field(() => Date)
    created_at!: Date;

    @Field()
    collection_owner_address!: string;

    @Field()
    collection_owner!: string;

    @Field(() => String,{ nullable: true })
    name?: string | null;

    @Field(() => String, { nullable: true })
    uri?: string | null;

    @Field(() => String, { nullable: true })
    metadata?: string | null;
}

@ObjectType()
class Auction {
    @Field(() => String)
    id!: string;

    @Field()
    auction_owner!: string;

    @Field()
    auction_creator!: string;

    @Field()
    start_price!: string;

    @Field()
    min_bid_step!: string;

    @Field(() => Date)
    created_at!: Date;

    @Field(() => Date)
    start_time!: Date;

    @Field(() => Date)
    end_time!: Date;

    @Field(() => String,{ nullable: true })
    winner?: string | null;

    @Field()
    token_id!: string;

    @Field()
    collection!: string;

    @Field()
    currency!: boolean;

    @Field(() => String,{ nullable: true })
    psp22_addr?: string | null;
}

export { Listing, NFT, User, Collection, Auction };
