import type * as EventTypes from '../event-types/marketplace';
import type {ContractPromise} from "@polkadot/api-contract";
import type {ApiPromise} from "@polkadot/api";
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/marketplace.json';
import {getEventTypeDescription} from "../shared/utils";
import {handleEventReturn} from "@727-ventures/typechain-types";

export default class EventsClass {
	readonly __nativeContract : ContractPromise;
	readonly __api : ApiPromise;

	constructor(
		nativeContract : ContractPromise,
		api : ApiPromise,
	) {
		this.__nativeContract = nativeContract;
		this.__api = api;
	}

	public subscribeOnListNFTEvent(callback : (event : EventTypes.ListNFT) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('ListNFT', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.ListNFT);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'ListNFT');
	}

	public subscribeOnCancelListingEvent(callback : (event : EventTypes.CancelListing) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('CancelListing', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.CancelListing);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'CancelListing');
	}

	public subscribeOnBuyNFTEvent(callback : (event : EventTypes.BuyNFT) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('BuyNFT', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.BuyNFT);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'BuyNFT');
	}

	public subscribeOnBuyBatchEvent(callback : (event : EventTypes.BuyBatch) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('BuyBatch', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.BuyBatch);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'BuyBatch');
	}

	public subscribeOnAuctionCreatedEvent(callback : (event : EventTypes.AuctionCreated) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('AuctionCreated', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.AuctionCreated);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'AuctionCreated');
	}

	public subscribeOnCancelAuctionEvent(callback : (event : EventTypes.CancelAuction) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('CancelAuction', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.CancelAuction);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'CancelAuction');
	}

	public subscribeOnBidPlacedEvent(callback : (event : EventTypes.BidPlaced) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('BidPlaced', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.BidPlaced);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'BidPlaced');
	}

	public subscribeOnNFTClaimedEvent(callback : (event : EventTypes.NFTClaimed) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('NFTClaimed', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.NFTClaimed);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'NFTClaimed');
	}

	public subscribeOnNoBidsEvent(callback : (event : EventTypes.NoBids) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('NoBids', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.NoBids);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'NoBids');
	}

	public subscribeOnStartAuctionEvent(callback : (event : EventTypes.StartAuction) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('StartAuction', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.StartAuction);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'StartAuction');
	}

	public subscribeOnEndAuctionEvent(callback : (event : EventTypes.EndAuction) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('EndAuction', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.EndAuction);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'EndAuction');
	}

	public subscribeOnAdminAddedEvent(callback : (event : EventTypes.AdminAdded) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('AdminAdded', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.AdminAdded);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'AdminAdded');
	}

	public subscribeOnAdminRemovedEvent(callback : (event : EventTypes.AdminRemoved) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('AdminRemoved', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.AdminRemoved);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'AdminRemoved');
	}


	private __subscribeOnEvent(
		callback : (args: any[], event: any) => void,
		filter : (eventName: string) => boolean = () => true
	) {
		// @ts-ignore
		return this.__api.query.system.events((events) => {
			events.forEach((record: any) => {
				const { event } = record;

				if (event.method == 'ContractEmitted') {
					const [address, data] = record.event.data;

					if (address.toString() === this.__nativeContract.address.toString()) {
						const {args, event} = this.__nativeContract.abi.decodeEvent(data);

						if (filter(event.identifier.toString()))
							callback(args, event);
					}
				}
			});
		});
	}

}