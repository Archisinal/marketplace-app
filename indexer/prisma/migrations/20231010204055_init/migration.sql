-- CreateTable
CREATE TABLE "Listing" (
    "id" BIGSERIAL NOT NULL,
    "listing_id" BIGINT NOT NULL,
    "creator" TEXT NOT NULL,
    "collection" TEXT NOT NULL,
    "token_id" BIGINT NOT NULL,
    "price" BIGINT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3),
    "winner" BIGINT,
    "currency" BOOLEAN NOT NULL,
    "psp22_addr" TEXT,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NFT" (
    "id" BIGSERIAL NOT NULL,
    "owner" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "id_in_collection" BIGINT NOT NULL,
    "collection" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "minted_at" TIMESTAMP(3) NOT NULL,
    "metadata" TEXT,

    CONSTRAINT "NFT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" BIGSERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "is_creator" BOOLEAN NOT NULL,
    "nick" TEXT,
    "avatar_id" BIGINT,
    "avatar_address" TEXT,
    "avatar_uri" TEXT,
    "metadata" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" BIGSERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "collection_name" TEXT NOT NULL,
    "royalty" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "collection_owner_address" TEXT NOT NULL,
    "collection_owner" TEXT NOT NULL,
    "name" TEXT,
    "uri" TEXT,
    "metadata" TEXT,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Auction" (
    "id" BIGSERIAL NOT NULL,
    "auction_owner" TEXT NOT NULL,
    "auction_creator" TEXT NOT NULL,
    "start_price" BIGINT NOT NULL,
    "min_bid_step" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "winner" TEXT,
    "token_id" BIGINT NOT NULL,
    "collection" TEXT NOT NULL,
    "currency" BOOLEAN NOT NULL,
    "psp22_addr" TEXT,

    CONSTRAINT "Auction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Listing_listing_id_key" ON "Listing"("listing_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_address_key" ON "Collection"("address");
