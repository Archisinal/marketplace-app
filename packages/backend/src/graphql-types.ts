import { ObjectType, Field, ID, Int } from "type-graphql";
import "reflect-metadata";

@ObjectType()
class Listing {
  @Field(() => ID)
  id!: string;

  @Field()
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

  @Field(() => Date, { nullable: true })
  created_at?: Date;

  @Field(() => String, { nullable: true })
  winner?: string;

  @Field()
  currency!: boolean;

  @Field(() => String, { nullable: true })
  psp22_addr?: string;
}

@ObjectType()
class NFT {
  @Field()
  id!: string;

  @Field()
  owner!: string;

  @Field()
  creator!: string;

  @Field()
  id_in_collection!: string;

  @Field()
  collection!: string;

  @Field()
  img_url!: string;

  @Field({ nullable: true })
  category?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Date)
  minted_at!: Date;

  @Field({ nullable: true })
  metadata?: string;
}

@ObjectType()
class Bid {
  @Field(() => ID)
  id!: number;

  @Field()
  bidder!: string;

  @Field()
  auction!: string;

  @Field(() => Int)
  price!: number;

  @Field(() => Date)
  created!: Date;
}

@ObjectType()
class TransferHistory {
  @Field(() => ID)
  id!: number;

  @Field()
  from_address!: string;

  @Field()
  to_address!: string;

  @Field(() => Int)
  token_id!: number;

  @Field()
  collection!: string;

  @Field(() => Date)
  created_at!: Date;

  @Field()
  tx_hash!: string;

  @Field()
  status!: string;
}

@ObjectType()
class User {
  @Field()
  id!: string;

  @Field()
  address!: string;

  @Field({ nullable: true })
  contract_address?: string;

  @Field()
  is_creator!: boolean;

  @Field({ nullable: true })
  nick?: string;

  @Field({ nullable: true })
  avatar_id?: string;

  @Field({ nullable: true })
  avatar_address?: string;

  @Field({ nullable: true })
  avatar_uri?: string;

  @Field({ nullable: true })
  metadata?: string;
}

@ObjectType()
class Collection {
  @Field()
  address!: string;

  @Field()
  royalty!: string;

  @Field(() => Date)
  created_at!: Date;

  @Field()
  collection_owner_address!: string;

  @Field()
  collection_owner!: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  uri?: string;

  @Field({ nullable: true })
  metadata?: string;
}

@ObjectType()
class Auction {
  @Field()
  id!: string;

  @Field()
  auction_id!: string;

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

  @Field({ nullable: true })
  winner?: string;

  @Field()
  status!: string;

  @Field()
  token_id!: string;

  @Field()
  collection!: string;

  @Field()
  currency!: boolean;

  @Field({ nullable: true })
  psp22_addr?: string;
}

@ObjectType()
class BlockProgress {
  @Field(() => ID)
  id!: number;

  @Field(() => Int)
  lastAnalyzedBlock!: number;

  @Field(() => Date)
  updatedAt!: Date;
}

@ObjectType()
class Collections {
  @Field(() => ID)
  id!: number;

  @Field()
  collection!: string;

  @Field({ nullable: true })
  collection_index?: string;

  @Field({ nullable: true })
  is_whitelisted?: boolean;

  @Field({ nullable: true })
  is_blacklisted?: boolean;
}

@ObjectType()
class CodeHashes {
  @Field(() => ID)
  id!: number;

  @Field()
  codeHash!: string;

  @Field({ nullable: true })
  is_blacklisted?: boolean;
}

@ObjectType()
class WhiteListEnabled {
  @Field(() => ID)
  id!: number;

  @Field()
  enabled!: boolean;
}

@ObjectType()
class Approval {
  @Field(() => ID)
  id!: number;

  @Field()
  owner!: string;

  @Field()
  operator!: string;

  @Field()
  token_id!: string;

  @Field()
  approved!: boolean;
}

@ObjectType()
class Admins {
  @Field(() => ID)
  id!: number;

  @Field()
  admin!: string;

  @Field()
  contract_address!: string;
}

@ObjectType()
class ProcessedBlock {
  @Field(() => ID)
  id!: number;

  @Field(() => Int)
  blockNumber!: number;

  @Field(() => Date)
  processedAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}

export {
  Listing,
  NFT,
  Bid,
  TransferHistory,
  User,
  Collection,
  Auction,
  BlockProgress,
  Collections,
  CodeHashes,
  WhiteListEnabled,
  Approval,
  Admins,
  ProcessedBlock,
};
