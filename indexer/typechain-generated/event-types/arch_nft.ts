import type {ReturnNumber} from "@727-ventures/typechain-types";
import type * as ReturnTypes from '../types-returns/arch_nft';

export interface Transfer {
	from: ReturnTypes.AccountId | null;
	to: ReturnTypes.AccountId | null;
	tokenId: ReturnTypes.Id;
}

export interface Approval {
	owner: ReturnTypes.AccountId;
	spender: ReturnTypes.AccountId;
	tokenId: ReturnTypes.Id;
}

export interface SetCollectionName {
	name: string;
}

export interface SetCollectionUri {
	uri: string;
}

export interface SetCollectionAdditionalInfo {
	additionalInfo: string;
}

export interface SetAttribute {
	key: string;
	value: string;
}

