import { EventListenerImpl } from '../event-listener';
import { convertEvent } from '../event';
import EVENT_DATA_TYPE_DESCRIPTIONS from 'archisinal/dist/typechain-generated/event-data/marketplace.json';
import chalk from 'chalk';
import * as ReturnTypes from 'archisinal/typechain-generated/event-types/marketplace';
import { prisma } from '../../primsa';
import MarketplaceABI from 'archisinal/dist/artifacts/marketplace.json';

export class MarketplaceListener extends EventListenerImpl {
  constructor(address: string) {
    super(address, MarketplaceABI);
    console.log('🎉 Created MarketplaceListener');
  }

  async ListNFT(args: any): Promise<void> {
    const event = (await convertEvent(
      args,
      'ListNFT',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.ListNFT;

    const listing = {
      listing_id: JSON.stringify(event.listingId),
      creator: event.creator.toString(),
      collection: event.collection.toString(),
      token_id: JSON.stringify(event.tokenId),
      price: event.price.toNumber(),
      currency: !!event.currency.custom,
    };

    prisma.listing.create({
      data: listing,
    });

    console.log(chalk.red('✨  Created listing'), listing);

    // Check if NFT exists in DB
    const nft = await prisma.nFT.findFirst({
      where: {
        collection: event.collection.toString(),
        id_in_collection: JSON.stringify(event.tokenId),
      },
    });

    // If not, create it
    if (!nft) {
      const nft = {
        id_in_collection: JSON.stringify(event.tokenId),
        owner: event.creator.toString(),
        collection: event.collection.toString(),
        creator: event.creator.toString(),
        img_url: '',
        minted_at: new Date(),
      };

      prisma.nFT.create({
        data: nft,
      });

      console.log(chalk.red('🌟 Created NFT'), nft);
    }

    console.log(chalk.red('✨  Transfer'), event);
  }

  async CancelListing(args: any): Promise<void> {
    const event = (await convertEvent(
      args,
      'CancelListing',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.CancelListing;

    prisma.listing.updateMany({
      where: {
        listing_id: JSON.stringify(event.listingId),
      },
      data: {
        status: 'cancelled',
      },
    });

    console.log(chalk.red('✨  CancelListing'), event);
  }

  async BuyNFT(args: any): Promise<void> {
    const event = (await convertEvent(
      args,
      'BuyNFT',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.BuyNFT;

    await buyNFT(event);

    console.log(chalk.red('✨  BuyNFT'), event);
  }

  async BuyBatch(args: any): Promise<void> {
    const event = (await convertEvent(
      args,
      'BuyBatch',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.BuyBatch;

    for (const listingId of event.listingIds) {
      await buyNFT({
        listingId,
        buyer: event.buyer,
      });
    }

    console.log(chalk.red('✨  BuyBatch'), event);
  }

  async AuctionCreated(args: any): Promise<void> {
    const event = (await convertEvent(
      args,
      'AuctionCreated',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.AuctionCreated;

    const auction = {
      auction_id: event.auctionId.toString(),
      auction_owner: event.creator.toString(),
      auction_creator: event.creator.toString(),
      start_price: event.startPrice.toNumber(),
      min_bid_step: event.minBidStep.toNumber(),
      start_time: new Date(event.startTime),
      end_time: new Date(event.endTime),
      status: 'active',
      token_id: JSON.stringify(event.tokenId),
      collection: event.collection.toString(),
      currency: !!event.currency.custom,
      created_at: new Date(),
    };

    prisma.auction.create({
      data: auction,
    });

    console.log(chalk.red('✨  AuctionCreated'), event);
  }

  async CancelAuction(args: any): Promise<void> {
    const event = (await convertEvent(
      args,
      'CancelAuction',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.CancelAuction;

    prisma.auction.updateMany({
      where: {
        auction_id: event.auctionId.toString(),
      },
      data: {
        status: 'cancelled',
      },
    });

    console.log(chalk.red('✨  CancelAuction'), event);
  }

  async BidPlaced(args: any): Promise<void> {
    const event = (await convertEvent(
      args,
      'BidPlaced',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.BidPlaced;

    const bid = {
      bidder: event.bidder.toString(),
      auction: event.auctionId.toString(),
      price: event.bid.toNumber(),
      created: new Date(),
    };

    prisma.bid.create({
      data: bid,
    });

    console.log(chalk.red('✨  BidPlaced'), event);
  }

  async NFTClaimed(args: any): Promise<void> {
    const event = (await convertEvent(
      args,
      'NFTClaimed',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.NFTClaimed;

    const auction = await prisma.auction.findFirst({
      where: {
        auction_id: event.auctionId.toString(),
      },
    });

    if (!auction) {
      console.log(chalk.red('❌  Auction not found'), event);
      return;
    }

    // get highest bid
    const bid = await prisma.bid.findFirst({
      where: {
        auction: event.auctionId.toString(),
      },
      orderBy: {
        price: 'desc',
      },
    });

    // Update auction status
    prisma.auction.updateMany({
      where: {
        auction_id: event.auctionId.toString(),
      },
      data: {
        status: 'sold',
        winner: bid?.bidder,
      },
    });

    // Update NFT owner
    if (bid) {
      prisma.nFT.updateMany({
        where: {
          collection: auction.collection,
          id_in_collection: auction.token_id,
        },
        data: {
          owner: bid.bidder,
        },
      });

      console.log(chalk.red('↔️  Transferred NFT'), {
        collection: auction.collection,
        id_in_collection: auction.token_id,
        owner: bid.bidder,
      });
    }

    console.log(chalk.red('✨  NFTClaimed'), event);
  }

  async NoBids(args: any): Promise<void> {
    const event = (await convertEvent(
      args,
      'NoBids',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.NoBids;

    const auction = await prisma.auction.findFirst({
      where: {
        auction_id: event.auctionId.toString(),
      },
    });

    if (!auction) {
      console.log(chalk.red('❌  Auction not found'), event);
      return;
    }

    // Update auction status
    prisma.auction.updateMany({
      where: {
        auction_id: event.auctionId.toString(),
      },
      data: {
        status: 'cancelled',
      },
    });

    console.log(chalk.red('✨  NoBids'), event);
  }

  async StartAuction(args: any): Promise<void> {
    const event = (await convertEvent(
      args,
      'StartAuction',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.StartAuction;

    const auction = await prisma.auction.findFirst({
      where: {
        auction_id: event.auctionId.toString(),
      },
    });

    if (!auction) {
      console.log(chalk.red('❌  Auction not found'), event);
      return;
    }

    // Update auction status
    prisma.auction.updateMany({
      where: {
        auction_id: event.auctionId.toString(),
      },
      data: {
        status: 'active',
      },
    });

    console.log(chalk.red('✨  StartAuction'), event);
  }

  async EndAuction(args: any): Promise<void> {
    const event = (await convertEvent(
      args,
      'EndAuction',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.EndAuction;

    const auction = await prisma.auction.findFirst({
      where: {
        auction_id: event.auctionId.toString(),
      },
    });

    if (!auction) {
      console.log(chalk.red('❌  Auction not found'), event);
      return;
    }

    // Update auction status
    prisma.auction.updateMany({
      where: {
        auction_id: event.auctionId.toString(),
      },
      data: {
        status: 'ended',
      },
    });

    console.log(chalk.red('✨  EndAuction'), event);
  }

  async AdminAdded(args: any): Promise<void> {
    const event = (await convertEvent(
      args,
      'AdminAdded',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.AdminAdded;

    console.log(chalk.red('✨  AdminAdded'), event);
  }

  async AdminRemoved(args: any): Promise<void> {
    const event = (await convertEvent(
      args,
      'AdminRemoved',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.AdminRemoved;

    console.log(chalk.red('✨  AdminRemoved'), event);
  }
}

const buyNFT = async (event: ReturnTypes.BuyNFT) => {
  const listing = await prisma.listing.findFirst({
    where: {
      listing_id: JSON.stringify(event.listingId),
    },
  });

  if (!listing) {
    console.log(chalk.red('❌  Listing not found'), event);
    return;
  }

  prisma.listing.updateMany({
    where: {
      listing_id: JSON.stringify(event.listingId),
    },
    data: {
      status: 'sold',
      winner: event.buyer.toString(),
    },
  });

  // Update NFT owner
  prisma.nFT.updateMany({
    where: {
      collection: listing.collection,
      id_in_collection: listing.token_id,
    },
    data: {
      owner: event.buyer.toString(),
    },
  });

  console.log(chalk.red('↔️  Transferred NFT'), {
    collection: listing.collection,
    id_in_collection: listing.token_id,
    owner: event.buyer.toString(),
  });
};
