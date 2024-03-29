import { EventListenerImpl } from '../event-listener';
import { convertEvent } from '../event';
import EVENT_DATA_TYPE_DESCRIPTIONS from '@archisinal/contracts/dist/typechain-generated/event-data/marketplace.json';
import chalk from 'chalk';
import * as ReturnTypes from '@archisinal/contracts/dist/typechain-generated/event-types/marketplace';
import prisma from '@archisinal/db';
import MarketplaceABI from '@archisinal/contracts/dist/artifacts/marketplace.json';
import { Block } from '@polkadot/types/interfaces';
import { formatAddressSS58, getBlockTimestamp, idToString } from '../../utils';
import { broadcastChange } from '../../index';

export class MarketplaceListener extends EventListenerImpl {
  constructor(address: string) {
    super(address, MarketplaceABI);
    console.log(`🎉 Created MarketplaceListener <${address}>`);
  }

  async ListNFT(args: any, block: Block): Promise<void> {
    const event = (await convertEvent(
      args,
      'ListNFT',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.ListNFT;

    const created_at = await getBlockTimestamp(block.header.hash.toString());

    const listing = await prisma.listing.create({
      data: {
        id: event.listingId.toNumber(),
        creator: await formatAddressSS58(event.creator.toString()),
        collection: event.collection.toString(),
        token_id: idToString(event.tokenId),
        price: event.price.rawNumber.toString(),
        currency: !!event.currency.custom,
        created_at: new Date(created_at),
      },
    });

    broadcastChange({ event: 'NFTListed', data: listing });

    console.log(chalk.red('✨  Created listing'), listing);
  }

  async CancelListing(args: any): Promise<void> {
    const event = (await convertEvent(
      args,
      'CancelListing',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.CancelListing;

    await prisma.listing.updateMany({
      where: {
        id: event.listingId.toNumber(),
      },
      data: {
        status: 'cancelled',
      },
    });

    broadcastChange({ event: 'ListingCancelled', data: event });

    console.log(chalk.red('✨  CancelListing'), event);
  }

  async BuyNFT(args: any): Promise<void> {
    const event = (await convertEvent(
      args,
      'BuyNFT',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.BuyNFT;

    await buyNFT(event);

    broadcastChange({ event: 'NFTBuy', data: event });

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

  async AuctionCreated(args: any, block: Block): Promise<void> {
    const event = (await convertEvent(
      args,
      'AuctionCreated',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.AuctionCreated;

    const created_at = await getBlockTimestamp(block.header.hash.toString());

    const auction = {
      auction_id: event.auctionId.toString(),
      auction_owner: await formatAddressSS58(event.creator.toString()),
      auction_creator: await formatAddressSS58(event.creator.toString()),
      start_price: event.startPrice.toNumber(),
      min_bid_step: event.minBidStep.toNumber(),
      start_time: new Date(event.startTime),
      end_time: new Date(event.endTime),
      status: 'active',
      token_id: idToString(event.tokenId),
      collection: event.collection.toString(),
      currency: !!event.currency.custom,
      created_at: new Date(created_at),
    };

    await prisma.auction.create({
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

    await prisma.auction.updateMany({
      where: {
        auction_id: event.auctionId.toString(),
      },
      data: {
        status: 'cancelled',
      },
    });

    console.log(chalk.red('✨  CancelAuction'), event);
  }

  async BidPlaced(args: any, block: Block): Promise<void> {
    const event = (await convertEvent(
      args,
      'BidPlaced',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.BidPlaced;

    const created = await getBlockTimestamp(block.header.hash.toString());

    const bid = {
      bidder: await formatAddressSS58(event.bidder.toString()),
      auction: event.auctionId.toString(),
      price: event.bid.toNumber(),
      created: created.toString(),
    };

    await prisma.bid.create({
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
    await prisma.auction.updateMany({
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
      await prisma.nFT.updateMany({
        where: {
          collection_address: auction.collection,
          id_in_collection: auction.token_id,
        },
        data: {
          owner: await formatAddressSS58(bid.bidder),
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
    await prisma.auction.updateMany({
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
    await prisma.auction.updateMany({
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
    await prisma.auction.updateMany({
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

    await prisma.admins.create({
      data: {
        admin: await formatAddressSS58(event.accountId.toString()),
        contract_address: this.address,
      },
    });

    console.log(chalk.red('✨  AdminAdded'), event);
  }

  async AdminRemoved(args: any): Promise<void> {
    const event = (await convertEvent(
      args,
      'AdminRemoved',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.AdminRemoved;

    await prisma.admins.deleteMany({
      where: {
        admin: await formatAddressSS58(event.accountId.toString()),
        contract_address: this.address,
      },
    });

    console.log(chalk.red('✨  AdminRemoved'), event);
  }
}

const buyNFT = async (event: ReturnTypes.BuyNFT) => {
  const listing = await prisma.listing.findFirst({
    where: {
      id: event.listingId.toNumber(),
    },
  });

  if (!listing) {
    console.log(chalk.red('❌  Listing not found'), event);
    return;
  }

  await prisma.listing.updateMany({
    where: {
      id: event.listingId.toNumber(),
    },
    data: {
      status: 'sold',
      winner: await formatAddressSS58(event.buyer.toString()),
    },
  });

  // Update NFT owner
  await prisma.nFT.updateMany({
    where: {
      collection_address: listing.collection,
      id_in_collection: listing.token_id,
    },
    data: {
      owner: await formatAddressSS58(event.buyer.toString()),
    },
  });

  console.log(chalk.red('↔️  Transferred NFT'), {
    collection: listing.collection,
    id_in_collection: listing.token_id,
    owner: await formatAddressSS58(event.buyer.toString()),
  });
};
