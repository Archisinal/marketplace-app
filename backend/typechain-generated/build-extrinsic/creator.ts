/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/creator';
import type BN from 'bn.js';
import type { ApiPromise } from '@polkadot/api';



export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __apiPromise: ApiPromise;

	constructor(
		nativeContract : ContractPromise,
		apiPromise: ApiPromise,
	) {
		this.__nativeContract = nativeContract;
		this.__apiPromise = apiPromise;
	}
	/**
	 * setUserData
	 *
	 * @param { ArgumentTypes.UserData } userInfo,
	*/
	"setUserData" (
		userInfo: ArgumentTypes.UserData,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "user::setUserData", [userInfo], __options);
	}

	/**
	 * getUserData
	 *
	*/
	"getUserData" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "user::getUserData", [], __options);
	}

	/**
	 * createCollection
	 *
	 * @param { string } name,
	 * @param { string } uri,
	 * @param { (number | string | BN) } royalty,
	 * @param { string } additionalInfo,
	 * @param { ArgumentTypes.Hash } codeHash,
	*/
	"createCollection" (
		name: string,
		uri: string,
		royalty: (number | string | BN),
		additionalInfo: string,
		codeHash: ArgumentTypes.Hash,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "creator::createCollection", [name, uri, royalty, additionalInfo, codeHash], __options);
	}

	/**
	 * getCollectionCount
	 *
	*/
	"getCollectionCount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "creator::getCollectionCount", [], __options);
	}

	/**
	 * getCollectionIdByIndex
	 *
	 * @param { (number | string | BN) } index,
	*/
	"getCollectionIdByIndex" (
		index: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "creator::getCollectionIdByIndex", [index], __options);
	}

	/**
	 * renounceOwnership
	 *
	*/
	"renounceOwnership" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "ownable::renounceOwnership", [], __options);
	}

	/**
	 * transferOwnership
	 *
	 * @param { ArgumentTypes.AccountId } newOwner,
	*/
	"transferOwnership" (
		newOwner: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "ownable::transferOwnership", [newOwner], __options);
	}

	/**
	 * owner
	 *
	*/
	"owner" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "ownable::owner", [], __options);
	}

	/**
	 * setCodeHash
	 *
	 * @param { ArgumentTypes.Hash } newCodeHash,
	*/
	"setCodeHash" (
		newCodeHash: ArgumentTypes.Hash,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "upgradeable::setCodeHash", [newCodeHash], __options);
	}

}