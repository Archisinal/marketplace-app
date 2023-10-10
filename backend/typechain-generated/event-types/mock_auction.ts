import type {ReturnNumber} from "@727-ventures/typechain-types";
import type * as ReturnTypes from '../types-returns/mock_auction';

export interface ListNFT {
	listingId: ReturnNumber;
	creator: ReturnTypes.AccountId;
	collection: ReturnTypes.AccountId;
	tokenId: ReturnTypes.Id;
	price: ReturnNumber;
	currency: ReturnTypes.Currency;
}

export interface CancelListing {
	caller: ReturnTypes.AccountId;
	listingId: ReturnNumber;
}

export interface BuyNFT {
	buyer: ReturnTypes.AccountId;
	listingId: ReturnNumber;
}

export interface BuyBatch {
	buyer: ReturnTypes.AccountId;
	listingIds: Array<ReturnNumber>;
}

export interface AuctionCreated {
	auctionId: ReturnNumber;
	creator: ReturnTypes.AccountId;
	collection: ReturnTypes.AccountId;
	tokenId: ReturnTypes.Id;
	startPrice: ReturnNumber;
	minBidStep: ReturnNumber;
	startTime: number;
	endTime: number;
	currency: ReturnTypes.Currency;
}

export interface CancelAuction {
	caller: ReturnTypes.AccountId;
	auctionId: ReturnNumber;
}

export interface BidPlaced {
	bidder: ReturnTypes.AccountId;
	auctionId: ReturnNumber;
	bid: ReturnNumber;
}

export interface NFTClaimed {
	caller: ReturnTypes.AccountId;
	auctionId: ReturnNumber;
}

export interface NoBids {
	caller: ReturnTypes.AccountId;
	auctionId: ReturnNumber;
}

export interface StartAuction {
	caller: ReturnTypes.AccountId;
	auctionId: ReturnNumber;
}

export interface EndAuction {
	caller: ReturnTypes.AccountId;
	auctionId: ReturnNumber;
}

export interface AdminAdded {
	caller: ReturnTypes.AccountId;
	accountId: ReturnTypes.AccountId;
}

export interface AdminRemoved {
	caller: ReturnTypes.AccountId;
	accountId: ReturnTypes.AccountId;
}

