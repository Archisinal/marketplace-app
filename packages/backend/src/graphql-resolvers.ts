import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import {
  Auction,
  Collection,
  Listing,
  NFT,
  NFTCounts,
  User,
} from "./graphql-types";
import prisma from "@archisinal/db";
import "reflect-metadata";

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
    @Arg("pagination", { nullable: true }) pagination: string,
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
        price: bigintToString(listing.price)!,
      };
    });
  }

  @Query(() => Listing, { nullable: true })
  async listing(@Arg("id", () => ID) id: string): Promise<Listing | null> {
    const listing = await prisma.listing.findUnique({
      where: { id: stringToBigint(id)! },
    });

    if (!listing) {
      return null;
    }

    return {
      ...listing,
      id: bigintToString(listing.id)!,
      price: bigintToString(listing.price)!,
    };
  }

  @Query(() => [NFT])
  async nfts(
    @Arg("owner", { nullable: true }) owner: string,
    @Arg("orderBy", { nullable: true }) orderBy: string,
    @Arg("collection", { nullable: true }) collection: string,
    @Arg("categories", { nullable: true }) categories: string,
    @Arg("creator", { nullable: true }) creator: string,
    @Arg("last_n", { nullable: true }) last_n: number,
    @Arg("pagination", { nullable: true }) pagination: string,
  ): Promise<NFT[]> {
    let pagination_parsed = parsePagination(pagination);

    const nfts = await prisma.nFT.findMany({
      where: {
        AND: [
          {
            owner: owner,
          },
          {
            OR: categories?.split(",").map((category) => ({
              category: {
                contains: category.trim(),
              },
            })),
          },
          { collection_address: collection },
          { creator: creator },
        ],
      },
      ...(orderBy && { orderBy: { ...parseOrderBy(orderBy) } }),
      ...(last_n && { take: last_n }),
      ...(pagination && {
        skip: pagination_parsed.page * pagination_parsed.page_cap,
        take: pagination_parsed.page_cap,
      }),
      include: {
        collection: true,
        listings: true,
      },
    });

    return nfts.map((nft) => {
      return {
        ...nft,
        listings: nft.listings?.map((listing) => ({
          ...listing,
          id: bigintToString(listing.id)!,
          price: bigintToString(listing.price)!,
        })),
        collection: {
          ...nft.collection,
          royalty: bigintToString(nft.collection.royalty)!,
        },
        id: bigintToString(nft.id)!,
        id_in_collection: nft.id_in_collection!,
        name: nft.name! || null,
        categories: nft.category?.split(","),
      };
    });
  }

  @Query(() => [NFT])
  async nfts_on_sale(
    @Arg("creator", { nullable: true }) creator: string,
    @Arg("collection", { nullable: true }) collection: string,
    @Arg("categories", { nullable: true }) categories: string,
    @Arg("orderBy", { nullable: true }) orderBy: string,
    @Arg("last_n", { nullable: true }) last_n: number,
    @Arg("pagination", { nullable: true }) pagination: string,
    @Arg("search", { nullable: true }) search: string,
  ): Promise<NFT[]> {
    let pagination_parsed = parsePagination(pagination);

    const listings = await prisma.listing.findMany({
      where: {
        AND: [
          search && {
            OR: [
              {
                nft: {
                  name: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              },
              {
                nft: {
                  collection: {
                    address: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                },
              },
            ],
          },
          {
            status: "active",
          },
          {
            OR: categories?.split(",").map((category) => ({
              nft: {
                category: {
                  contains: category.trim(),
                },
              },
            })),
          },
          { creator: creator },
        ],
      },
      ...(orderBy && { orderBy: { ...parseOrderBy(orderBy) } }),
      ...(last_n && { take: last_n }),
      ...(pagination && {
        skip: pagination_parsed.page * pagination_parsed.page_cap,
        take: pagination_parsed.page_cap,
      }),
      include: {
        nft: {
          include: {
            collection: true,
            listings: true,
          },
        },
      },
    });

    return listings.map(({ nft }) => {
      return {
        ...nft,
        listings: nft.listings?.map((listing) => ({
          ...listing,
          id: bigintToString(listing.id)!,
          price: bigintToString(listing.price)!,
        })),
        collection: {
          ...nft.collection,
          royalty: bigintToString(nft.collection.royalty)!,
        },
        id: bigintToString(nft.id)!,
        id_in_collection: nft.id_in_collection!,
        name: nft.name! || null,
        categories: nft.category?.split(","),
      };
    });
  }

  @Query(() => NFT, { nullable: true })
  async nft(@Arg("id", () => ID) id: string): Promise<NFT | null> {
    const nft = await prisma.nFT.findUnique({
      where: { id: stringToBigint(id)! },
      include: {
        collection: true,
        listings: true,
      },
    });

    if (!nft) {
      return null;
    }

    return {
      ...nft,
      listings: nft.listings?.map((listing) => ({
        ...listing,
        id: bigintToString(listing.id)!,
        price: bigintToString(listing.price)!,
      })),
      collection: {
        ...nft.collection,
        royalty: bigintToString(nft.collection.royalty)!,
      },
      id: bigintToString(nft.id)!,
      id_in_collection: nft.id_in_collection!,
      name: nft.name! || null,
      categories: nft.category?.split(","),
    };
  }

  @Query(() => [User])
  async users(
    @Arg("orderBy", { nullable: true }) orderBy: string,
    @Arg("last_n", { nullable: true }) last_n: number,
    @Arg("pagination", { nullable: true }) pagination: string,
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

  @Query(() => NFTCounts, { nullable: true })
  async nft_counts(@Arg("owner") owner: string): Promise<NFTCounts> {
    const owned = await prisma.nFT.count({
      where: {
        owner: owner,
      },
    });
    const created = await prisma.nFT.count({
      where: {
        creator: owner,
      },
    });
    const on_sale = await prisma.listing.count({
      where: {
        creator: owner,
        status: "active",
      },
    });

    return {
      owned,
      created,
      on_sale,
    };
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
      avatar_id: user.avatar_id!,
    };
  }

  @Query(() => [Collection])
  async collections(
    @Arg("orderBy", { nullable: true }) orderBy: string,
    @Arg("last_n", { nullable: true }) last_n: number,
    @Arg("pagination", { nullable: true }) pagination: string,
    @Arg("owner", { nullable: true }) owner: string,
  ): Promise<Collection[]> {
    let pagination_parsed = parsePagination(pagination);

    const collections = await prisma.collection.findMany({
      ...(orderBy && { orderBy: { ...parseOrderBy(orderBy) } }),
      ...(last_n && { take: last_n }),
      ...(owner && { where: { collection_owner: owner } }),
      ...(pagination && {
        skip: pagination_parsed.page * pagination_parsed.page_cap,
        take: pagination_parsed.page_cap,
      }),
      include: {
        nfts: {
          include: {
            listings: true,
          },
        },
      },
    });

    return collections.map((collection) => ({
      ...collection,
      royalty: bigintToString(collection.royalty)!,
      nfts: collection.nfts?.map((nft) => ({
        ...nft,
        listings: nft.listings?.map((listing) => ({
          ...listing,
          id: bigintToString(listing.id)!,
          price: bigintToString(listing.price)!,
        })),
        id: bigintToString(nft.id)!,
        id_in_collection: nft.id_in_collection!,
        name: nft.name! || null,
        categories: nft.category?.split(","),
      })),
    }));
  }

  @Query(() => Collection, { nullable: true })
  async collection(
    @Arg("address", () => String) address: string,
  ): Promise<Collection | null> {
    const collection = await prisma.collection.findUnique({
      where: { address: address! },
      include: {
        nfts: {
          include: {
            listings: true,
            collection: true,
          },
        },
      },
    });

    if (!collection) {
      return null;
    }

    return {
      ...collection,
      royalty: bigintToString(collection.royalty)!,
      nfts: collection.nfts?.map((nft) => ({
        ...nft,
        listings: nft.listings?.map((listing) => ({
          ...listing,
          id: bigintToString(listing.id)!,
          price: bigintToString(listing.price)!,
        })),
        collection: {
          ...nft.collection,
          royalty: bigintToString(nft.collection.royalty)!,
        },
        id: bigintToString(nft.id)!,
        id_in_collection: nft.id_in_collection!,
        name: nft.name! || null,
        categories: nft.category?.split(","),
      })),
    };
  }
  @Query(() => [Auction])
  async auctions(
    @Arg("orderBy", { nullable: true }) orderBy: string,
    @Arg("last_n", { nullable: true }) last_n: number,
    @Arg("status", { nullable: true }) status: string,
    @Arg("pagination", { nullable: true }) pagination: string,
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
      token_id: auction.token_id!,
    };
  }

  @Mutation(() => Boolean)
  async registerView(@Arg("id", () => ID) id: string): Promise<boolean> {
    const nft = await prisma.nFT.findUnique({
      where: { id: stringToBigint(id)! },
    });

    if (!nft) {
      return false;
    }

    if (nft.views === null) {
      await prisma.nFT.update({
        where: { id: stringToBigint(id)! },
        data: {
          views: 1,
        },
      });
    } else {
      await prisma.nFT.update({
        where: { id: stringToBigint(id)! },
        data: {
          views: {
            increment: 1,
          },
        },
      });
    }

    return true;
  }
}

export default MyResolver;
