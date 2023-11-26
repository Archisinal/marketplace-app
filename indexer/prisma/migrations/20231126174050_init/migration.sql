/*
  Warnings:

  - Added the required column `auction_id` to the `Auction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Auction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img_url` to the `NFT` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Listing_listing_id_key";

-- AlterTable
ALTER TABLE "Auction" ADD COLUMN     "auction_id" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ALTER COLUMN "token_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Listing" ALTER COLUMN "listing_id" SET DATA TYPE TEXT,
ALTER COLUMN "token_id" SET DATA TYPE TEXT,
ALTER COLUMN "winner" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "NFT" ADD COLUMN     "category" TEXT,
ADD COLUMN     "img_url" TEXT NOT NULL,
ALTER COLUMN "id_in_collection" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "contract_address" TEXT,
ALTER COLUMN "avatar_id" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Bid" (
    "id" BIGSERIAL NOT NULL,
    "bidder" TEXT NOT NULL,
    "auction" TEXT NOT NULL,
    "price" BIGINT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransferHistory" (
    "id" BIGSERIAL NOT NULL,
    "from_address" TEXT NOT NULL,
    "to_address" TEXT NOT NULL,
    "token_id" BIGINT NOT NULL,
    "collection" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "tx_hash" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "TransferHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockProgress" (
    "id" SERIAL NOT NULL,
    "lastAnalyzedBlock" BIGINT NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlockProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collections" (
    "id" BIGSERIAL NOT NULL,
    "collection" TEXT NOT NULL,
    "collection_index" TEXT,
    "is_whitelisted" BOOLEAN,
    "is_blacklisted" BOOLEAN,

    CONSTRAINT "Collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CodeHashes" (
    "id" BIGSERIAL NOT NULL,
    "codeHash" TEXT NOT NULL,
    "is_blacklisted" BOOLEAN,

    CONSTRAINT "CodeHashes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhiteListEnabled" (
    "id" BIGSERIAL NOT NULL,
    "enabled" BOOLEAN NOT NULL,

    CONSTRAINT "WhiteListEnabled_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Approval" (
    "id" BIGSERIAL NOT NULL,
    "owner" TEXT NOT NULL,
    "operator" TEXT NOT NULL,
    "token_id" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL,

    CONSTRAINT "Approval_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Collections_collection_key" ON "Collections"("collection");

-- CreateIndex
CREATE UNIQUE INDEX "Collections_collection_index_key" ON "Collections"("collection_index");

-- CreateIndex
CREATE UNIQUE INDEX "CodeHashes_codeHash_key" ON "CodeHashes"("codeHash");
