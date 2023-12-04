import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  let users = [];

  for (let i = 0; i < 10; i++) {
    users.push({
      address: `user${i}_address`,
      is_creator: true,
      nick: `User ${i}`,
      avatar_id: i,
      avatar_address: `avatar_address_${i}`,
      avatar_uri: `avatar_uri_${i}`,
      metadata: `User ${i} Metadata`,
    });
  }

  await prisma.user.createMany({
    data: users,
  });

  let collections = [];

  for (let i = 0; i < 10; i++) {
    collections.push({
      address: `collection${i}_address`,
      name: `Collection ${i}`,
      created_at: new Date(),
      metadata: `Collection ${i} Metadata`,
      collection_name: `Collection ${i}`,
      royalty: 10,
      collection_owner_address: `user${i}_address`,
      collection_owner: `user${i}_address`,
    });
  }

  await prisma.collection.createMany({
    data: collections,
  });

  let listings = [];

  for (let i = 1; i <= 100; i++) {
    listings.push({
      listing_id: i,
      creator: `user${i % 10}_address`,
      collection: `collection${i % 10}_address`,
      token_id: i,
      price: i,
      status: 'active',
      created_at: new Date(),
      winner: null,
      currency: false,
      psp22_addr: null,
    });
  }

  await prisma.listing.createMany({
    data: listings,
  });

  let nfts = [];

  for (let i = 0; i < 100; i++) {
    nfts.push({
      owner: `user${i % 10}_address`,
      creator: `user${i % 10}_address`,
      id_in_collection: i,
      collection: `collection${i % 10}_address`,
      name: `NFT ${i}`,
      description: `Description for NFT ${i}`,
      minted_at: new Date(),
      metadata: `NFT ${i} Metadata`,
      img_url: `img_url_${i}`,
    });
  }

  await prisma.nFT.createMany({
    data: nfts,
  });

  let auctions = [];

  for (let i = 0; i < 100; i++) {
    auctions.push({
      auction_owner: `user${i % 10}_address`,
      auction_creator: `user${i % 10}_address`,
      start_price: i,
      min_bid_step: i,
      created_at: new Date(),
      start_time: new Date(),
      end_time: new Date(),
      winner: null,
      token_id: i,
      collection: `collection${i % 10}_address`,
      currency: false,
      psp22_addr: null,
      status: 'active',
    });
  }

  await prisma.auction.createMany({
    data: auctions,
  });

  console.log('Seed data inserted successfully!');

  await prisma.$disconnect();
}

main().catch((e) => {
  throw e;
});
