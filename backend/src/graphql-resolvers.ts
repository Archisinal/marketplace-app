import { Resolver, Query, Arg, ID } from "type-graphql";
import { PrismaClient } from "@prisma/client";
import { Listing, NFT, User, Collection, Auction } from "./graphql-types";

const prisma = new PrismaClient();

function bigintToString(value: bigint | null): string | null {
  return value !== null ? value.toString() : null;
}

function stringToBigint(value: string | null): bigint | null {
  return value !== null ? BigInt(value) : null;
}

function parseOrderBy(orderBy: string | null): { [key: string]: string } {
  if (!orderBy) {
    return {};
  }

  const [field, order] = orderBy.split("_");

  return {
    [field]: order,
  };
}

function parsePriceRange(price_range: string | null): {
  [key: string]: bigint;
} {
  if (!price_range) {
    return {};
  }

  const [min, max] = price_range.split("-");

  // parse min and max to bigint

  let min_parsed = BigInt(min);
  let max_parsed = BigInt(max);

  return {
    min: min_parsed,
    max: max_parsed,
  };
}

function parsePagination(pagination: string | null): { [key: string]: number } {
  if (!pagination) {
    return {};
  }

  const [page, page_cap] = pagination.split(",");

  // parse page and page_cap to number

  let page_parsed = Number(page);
  let page_cap_parsed = Number(page_cap);

  return {
    page: page_parsed,
    page_cap: page_cap_parsed,
  };
}

@Resolver()
class MyResolver {
  @Query(() => [Listing])
  async listings(
    @Arg("orderBy", { nullable: true }) orderBy: string,
    // format: "price_range: '1000-2000'"
    @Arg("price_range", { nullable: true }) price_range: string,
    @Arg("last_n", { nullable: true }) last_n: number,
    // format: "pagination: '0,10'"
    @Arg("pagination", { nullable: true }) pagination: string
  ): Promise<Listing[]> {
    let orderByParsed = parseOrderBy(orderBy);

    let price_range_parsed = parsePriceRange(price_range);
    let pagination_parsed = parsePagination(pagination);

    const listings = await prisma.listing.findMany({
      ...(orderByParsed && { orderBy: { ...orderByParsed } }),
      ...(last_n && { take: last_n }),
      ...(price_range && {
        where: {
          price: { gte: price_range_parsed.min, lte: price_range_parsed.max },
        },
      }),
      ...(pagination && {
        skip: pagination_parsed.page * pagination_parsed.page_cap,
        take: pagination_parsed.page_cap,
      }),
    });

    return listings.map((listing: any) => {
      return {
        ...listing,
        id: bigintToString(listing.id)!,
        token_id: bigintToString(listing.token_id)!,
      };
    });
  }

  @Query(() => Listing, { nullable: true })
  async listing(@Arg("id", () => ID) id: string): Promise<Listing | null> {
    const listing = await prisma.listing.findUnique({
      where: { id: stringToBigint(id)! },
    });

    console.log(listing);

    if (!listing) {
      return null;
    }

    return {
      ...listing,
      id: bigintToString(listing.id)!,
      listing_id: bigintToString(listing.listing_id)!,
      token_id: bigintToString(listing.token_id)!,
      price: bigintToString(listing.price)!,
      winner: bigintToString(listing.winner),
    };
  }

  @Query(() => [NFT])
  async nfts(
    @Arg("orderBy", { nullable: true }) orderBy: string,
    @Arg("collection", { nullable: true }) collection: string,
    @Arg("owner", { nullable: true }) owner: string,
    @Arg("creator", { nullable: true }) creator: string,
    @Arg("last_n", { nullable: true }) last_n: number,
    @Arg("pagination", { nullable: true }) pagination: string
  ): Promise<NFT[]> {
    let pagination_parsed = parsePagination(pagination);

    const nfts = await prisma.nFT.findMany({
      ...(orderBy && { orderBy: { ...parseOrderBy(orderBy) } }),
      ...(collection && { where: { collection: collection } }),
      ...(owner && { where: { owner: owner } }),
      ...(creator && { where: { creator: creator } }),
      ...(last_n && { take: last_n }),
      ...(pagination && {
        skip: pagination_parsed.page * pagination_parsed.page_cap,
        take: pagination_parsed.page_cap,
      }),
    });

    return nfts.map((nft: any) => {
      return {
        ...nft,
        id: bigintToString(nft.id)!,
        id_in_collection: bigintToString(nft.id_in_collection)!,
        name: nft.name! || null,
      };
    });
  }

  @Query(() => NFT, { nullable: true })
  async nft(@Arg("id", () => ID) id: string): Promise<NFT | null> {
    const nft = await prisma.nFT.findUnique({
      where: { id: stringToBigint(id)! },
    });

    if (!nft) {
      return null;
    }

    return {
      ...nft,
      id: bigintToString(nft.id)!,
      id_in_collection: bigintToString(nft.id_in_collection)!,
      name: nft.name! || null,
    };
  }

  @Query(() => [User])
  async users(
    @Arg("orderBy", { nullable: true }) orderBy: string,
    @Arg("last_n", { nullable: true }) last_n: number,
    @Arg("pagination", { nullable: true }) pagination: string
  ): Promise<User[]> {
    let pagination_parsed = parsePagination(pagination);

    const users = await prisma.user.findMany({
      ...(orderBy && { orderBy: { ...parseOrderBy(orderBy) } }),
      ...(last_n && { take: last_n }),
      ...(pagination && {
        skip: pagination_parsed.page * pagination_parsed.page_cap,
        take: pagination_parsed.page_cap,
      }),
    });

    return users.map((user: any) => {
      return {
        ...user,
        id: bigintToString(user.id)!,
        avatar_id: bigintToString(user.avatar_id)!,
      };
    });
  }

  @Query(() => User, { nullable: true })
  async user(@Arg("id", () => ID) id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id: stringToBigint(id)! },
    });

    if (!user) {
      return null;
    }

    return {
      ...user,
      id: bigintToString(user.id)!,
      avatar_id: bigintToString(user.avatar_id)!,
    };
  }

  @Query(() => [Collection])
  async collections(
    @Arg("orderBy", { nullable: true }) orderBy: string,
    @Arg("last_n", { nullable: true }) last_n: number,
    @Arg("pagination", { nullable: true }) pagination: string
  ): Promise<Collection[]> {
    let pagination_parsed = parsePagination(pagination);

    const collections = await prisma.collection.findMany({
      ...(orderBy && { orderBy: { ...parseOrderBy(orderBy) } }),
      ...(last_n && { take: last_n }),
      ...(pagination && {
        skip: pagination_parsed.page * pagination_parsed.page_cap,
        take: pagination_parsed.page_cap,
      }),
    });

    return collections.map((collection: any) => {
      return {
        ...collection,
        id: bigintToString(collection.id)!,
        royalty: bigintToString(collection.royalty)!,
      };
    });
  }

  @Query(() => Collection, { nullable: true })
  async collection(
    @Arg("id", () => ID) id: string
  ): Promise<Collection | null> {
    const collection = await prisma.collection.findUnique({
      where: { id: stringToBigint(id)! },
    });

    if (!collection) {
      return null;
    }

    return {
      ...collection,
      id: bigintToString(collection.id)!,
      royalty: bigintToString(collection.royalty)!,
    };
  }
  @Query(() => [Auction])
  async auctions(
    @Arg("orderBy", { nullable: true }) orderBy: string,
    @Arg("last_n", { nullable: true }) last_n: number,
    @Arg("status", { nullable: true }) status: string,
    @Arg("pagination", { nullable: true }) pagination: string
  ): Promise<Auction[]> {
    let pagination_parsed = parsePagination(pagination);

    const auctions = await prisma.auction.findMany({
      ...(orderBy && { orderBy: { ...parseOrderBy(orderBy) } }),
      ...(last_n && { take: last_n }),
      ...(pagination && {
        skip: pagination_parsed.page * pagination_parsed.page_cap,
        take: pagination_parsed.page_cap,
      }),
      ...(status && { where: { status: status } }),
    });

    return auctions.map((auction: any) => {
      return {
        ...auction,
        id: bigintToString(auction.id)!,
        start_price: bigintToString(auction.start_price)!,
        min_bid_step: bigintToString(auction.min_bid_step)!,
        token_id: bigintToString(auction.token_id)!,
      };
    });
  }

  @Query(() => Auction, { nullable: true })
  async auction(@Arg("id", () => ID) id: string): Promise<Auction | null> {
    const auction = await prisma.auction.findUnique({
      where: { id: stringToBigint(id)! },
    });

    if (!auction) {
      return null;
    }

    return {
      ...auction,
      id: bigintToString(auction.id)!,
      start_price: bigintToString(auction.start_price)!,
      min_bid_step: bigintToString(auction.min_bid_step)!,
      token_id: bigintToString(auction.token_id)!,
    };
  }
}

export default MyResolver;
