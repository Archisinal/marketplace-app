import type BN from 'bn.js';

export type AccountId = string | number[]

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

export type UserData = {
	nick: string | null,
	avatar: NFT | null,
	additionInfo: string | null
}

export type NFT = {
	id: Id,
	uri: string,
	contractAddress: string
}

export interface Id {
	u8 ? : (number | string | BN),
	u16 ? : (number | string | BN),
	u32 ? : (number | string | BN),
	u64 ? : (number | string | BN),
	u128 ? : (string | number | BN),
	bytes ? : Array<(number | string | BN)>
}

export class IdBuilder {
	static U8(value: (number | string | BN)): Id {
		return {
			u8: value,
		};
	}
	static U16(value: (number | string | BN)): Id {
		return {
			u16: value,
		};
	}
	static U32(value: (number | string | BN)): Id {
		return {
			u32: value,
		};
	}
	static U64(value: (number | string | BN)): Id {
		return {
			u64: value,
		};
	}
	static U128(value: (string | number | BN)): Id {
		return {
			u128: value,
		};
	}
	static Bytes(value: Array<(number | string | BN)>): Id {
		return {
			bytes: value,
		};
	}
}

export interface ArchisinalError {
	noOwner ? : null,
	adminAccessError ? : null,
	auctionMinBidStepIsZero ? : null,
	creatorIsNotCaller ? : null,
	auctionStartTimeIsBeforeNow ? : null,
	callerIsAuctionOwner ? : null,
	accountAlreadyExists ? : null,
	insufficientFunds ? : null,
	auctionPriceIsZero ? : null,
	auctionEndTimeIsBeforeStartTime ? : null,
	collectionOwnerNotFound ? : null,
	auctionHasNoBids ? : null,
	auctionNotEnded ? : null,
	bidPriceTooLow ? : null,
	auctionEnded ? : null,
	auctionNotStarted ? : null,
	auctionNotInAuction ? : null,
	listingNotOnSale ? : null,
	auctionNotWaiting ? : null,
	callerIsNotAuctionOwner ? : null,
	callerIsListingOwner ? : null,
	callerIsNotListingOwner ? : null,
	auctionNotFound ? : null,
	listingNotFound ? : null,
	integerOverflow ? : null,
	integerUnderflow ? : null,
	collectionNotFound ? : null,
	callerIsNotNftOwner ? : null,
	transferNativeError ? : null,
	ownable ? : OwnableError,
	accessControl ? : AccessControlError,
	psp34 ? : PSP34Error,
	psp22 ? : PSP22Error,
	other ? : string
}

export class ArchisinalErrorBuilder {
	static NoOwner(): ArchisinalError {
		return {
			noOwner: null,
		};
	}
	static AdminAccessError(): ArchisinalError {
		return {
			adminAccessError: null,
		};
	}
	static AuctionMinBidStepIsZero(): ArchisinalError {
		return {
			auctionMinBidStepIsZero: null,
		};
	}
	static CreatorIsNotCaller(): ArchisinalError {
		return {
			creatorIsNotCaller: null,
		};
	}
	static AuctionStartTimeIsBeforeNow(): ArchisinalError {
		return {
			auctionStartTimeIsBeforeNow: null,
		};
	}
	static CallerIsAuctionOwner(): ArchisinalError {
		return {
			callerIsAuctionOwner: null,
		};
	}
	static AccountAlreadyExists(): ArchisinalError {
		return {
			accountAlreadyExists: null,
		};
	}
	static InsufficientFunds(): ArchisinalError {
		return {
			insufficientFunds: null,
		};
	}
	static AuctionPriceIsZero(): ArchisinalError {
		return {
			auctionPriceIsZero: null,
		};
	}
	static AuctionEndTimeIsBeforeStartTime(): ArchisinalError {
		return {
			auctionEndTimeIsBeforeStartTime: null,
		};
	}
	static CollectionOwnerNotFound(): ArchisinalError {
		return {
			collectionOwnerNotFound: null,
		};
	}
	static AuctionHasNoBids(): ArchisinalError {
		return {
			auctionHasNoBids: null,
		};
	}
	static AuctionNotEnded(): ArchisinalError {
		return {
			auctionNotEnded: null,
		};
	}
	static BidPriceTooLow(): ArchisinalError {
		return {
			bidPriceTooLow: null,
		};
	}
	static AuctionEnded(): ArchisinalError {
		return {
			auctionEnded: null,
		};
	}
	static AuctionNotStarted(): ArchisinalError {
		return {
			auctionNotStarted: null,
		};
	}
	static AuctionNotInAuction(): ArchisinalError {
		return {
			auctionNotInAuction: null,
		};
	}
	static ListingNotOnSale(): ArchisinalError {
		return {
			listingNotOnSale: null,
		};
	}
	static AuctionNotWaiting(): ArchisinalError {
		return {
			auctionNotWaiting: null,
		};
	}
	static CallerIsNotAuctionOwner(): ArchisinalError {
		return {
			callerIsNotAuctionOwner: null,
		};
	}
	static CallerIsListingOwner(): ArchisinalError {
		return {
			callerIsListingOwner: null,
		};
	}
	static CallerIsNotListingOwner(): ArchisinalError {
		return {
			callerIsNotListingOwner: null,
		};
	}
	static AuctionNotFound(): ArchisinalError {
		return {
			auctionNotFound: null,
		};
	}
	static ListingNotFound(): ArchisinalError {
		return {
			listingNotFound: null,
		};
	}
	static IntegerOverflow(): ArchisinalError {
		return {
			integerOverflow: null,
		};
	}
	static IntegerUnderflow(): ArchisinalError {
		return {
			integerUnderflow: null,
		};
	}
	static CollectionNotFound(): ArchisinalError {
		return {
			collectionNotFound: null,
		};
	}
	static CallerIsNotNFTOwner(): ArchisinalError {
		return {
			callerIsNotNftOwner: null,
		};
	}
	static TransferNativeError(): ArchisinalError {
		return {
			transferNativeError: null,
		};
	}
	static Ownable(value: OwnableError): ArchisinalError {
		return {
			ownable: value,
		};
	}
	static AccessControl(value: AccessControlError): ArchisinalError {
		return {
			accessControl: value,
		};
	}
	static PSP34(value: PSP34Error): ArchisinalError {
		return {
			psp34: value,
		};
	}
	static PSP22(value: PSP22Error): ArchisinalError {
		return {
			psp22: value,
		};
	}
	static Other(value: string): ArchisinalError {
		return {
			other: value,
		};
	}
}

export enum OwnableError {
	callerIsNotOwner = 'CallerIsNotOwner',
	newOwnerIsZero = 'NewOwnerIsZero'
}

export enum AccessControlError {
	invalidCaller = 'InvalidCaller',
	missingRole = 'MissingRole',
	roleRedundant = 'RoleRedundant'
}

export interface PSP34Error {
	custom ? : string,
	selfApprove ? : null,
	notApproved ? : null,
	tokenExists ? : null,
	tokenNotExists ? : null,
	safeTransferCheckFailed ? : string
}

export class PSP34ErrorBuilder {
	static Custom(value: string): PSP34Error {
		return {
			custom: value,
		};
	}
	static SelfApprove(): PSP34Error {
		return {
			selfApprove: null,
		};
	}
	static NotApproved(): PSP34Error {
		return {
			notApproved: null,
		};
	}
	static TokenExists(): PSP34Error {
		return {
			tokenExists: null,
		};
	}
	static TokenNotExists(): PSP34Error {
		return {
			tokenNotExists: null,
		};
	}
	static SafeTransferCheckFailed(value: string): PSP34Error {
		return {
			safeTransferCheckFailed: value,
		};
	}
}

export interface PSP22Error {
	custom ? : string,
	insufficientBalance ? : null,
	insufficientAllowance ? : null,
	zeroRecipientAddress ? : null,
	zeroSenderAddress ? : null,
	safeTransferCheckFailed ? : string
}

export class PSP22ErrorBuilder {
	static Custom(value: string): PSP22Error {
		return {
			custom: value,
		};
	}
	static InsufficientBalance(): PSP22Error {
		return {
			insufficientBalance: null,
		};
	}
	static InsufficientAllowance(): PSP22Error {
		return {
			insufficientAllowance: null,
		};
	}
	static ZeroRecipientAddress(): PSP22Error {
		return {
			zeroRecipientAddress: null,
		};
	}
	static ZeroSenderAddress(): PSP22Error {
		return {
			zeroSenderAddress: null,
		};
	}
	static SafeTransferCheckFailed(value: string): PSP22Error {
		return {
			safeTransferCheckFailed: value,
		};
	}
}

export type Hash = string | number[]

export interface UpgradeableError {
	custom ? : string,
	setCodeHashFailed ? : null,
	ownableError ? : OwnableError,
	accessControlError ? : AccessControlError
}

export class UpgradeableErrorBuilder {
	static Custom(value: string): UpgradeableError {
		return {
			custom: value,
		};
	}
	static SetCodeHashFailed(): UpgradeableError {
		return {
			setCodeHashFailed: null,
		};
	}
	static OwnableError(value: OwnableError): UpgradeableError {
		return {
			ownableError: value,
		};
	}
	static AccessControlError(value: AccessControlError): UpgradeableError {
		return {
			accessControlError: value,
		};
	}
}

