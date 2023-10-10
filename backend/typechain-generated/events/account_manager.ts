import type * as EventTypes from '../event-types/account_manager';
import type {ContractPromise} from "@polkadot/api-contract";
import type {ApiPromise} from "@polkadot/api";
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/account_manager.json';
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

	public subscribeOnAccountCreatedEvent(callback : (event : EventTypes.AccountCreated) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('AccountCreated', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.AccountCreated);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'AccountCreated');
	}

	public subscribeOnCreatorAccountCreatedEvent(callback : (event : EventTypes.CreatorAccountCreated) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('CreatorAccountCreated', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.CreatorAccountCreated);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'CreatorAccountCreated');
	}

	public subscribeOnCodeHashSetEvent(callback : (event : EventTypes.CodeHashSet) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('CodeHashSet', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.CodeHashSet);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'CodeHashSet');
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