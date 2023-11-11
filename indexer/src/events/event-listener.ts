import {DotEvent} from "./event";
import {Abi} from "@polkadot/api-contract";
import ArchNFTAbi from "../../artifacts/arch_nft.json";

export interface EventListener {
    filter(event: DotEvent): Promise<boolean>;

    handle(event: DotEvent): Promise<void>;
}

export class EventListenerImpl implements EventListener {
    private address: string;

    constructor(address: string) {
        this.address = address;
    }

    async filter(event: DotEvent): Promise<boolean> {
        if (event.target !== this.address) {
            return false;
        }

        return true;
    }

    async handle(event: DotEvent): Promise<void> {
        try {
            console.log("ArchNFT event");

            const abi = new Abi(ArchNFTAbi);

            const decoded = abi.decodeEvent(event.data);

            const identifier = decoded.event.identifier.toString();
            const args = decoded.args;

            if (identifier in this) { // @ts-ignore
                await this[identifier](args);
            } else {
                console.warn("Unknown event", identifier);
            }
        } catch (e) {
            console.error(e);
        }
    }
}
