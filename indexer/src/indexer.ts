import {ApiPromise} from "@polkadot/api";
import {Block} from "@polkadot/types/interfaces";
import {EventListener} from "./events/event-listener";
import {DotEvent} from "./events/event";

export class PolkadotIndexer {
    api: ApiPromise;

    eventHandlers: Array<EventListener> = [];

    // Construct //
    constructor() {
        this.api = new ApiPromise();
    }

    async init() {
        this.api = await ApiPromise.create();
    }

    static async create() {
        const indexer = new PolkadotIndexer();
        await indexer.init();
        return indexer;
    }

    // Process block //

    async processBlock(block: Block) {
        console.log(`block #${block.header.number.toNumber()}`);

        const extrinsics = block.extrinsics;

        const filteredExtrinsics = extrinsics.filter(extrinsic => {
            return extrinsic.method.section === "contracts" && extrinsic.method.method === "call";
        });

        for (const extrinsic of filteredExtrinsics) {
            await this.processExtrinsic(extrinsic);
        }


    }

    async retrieveBlock(id: number) {
        try {
            const blockHash = await this.api.rpc.chain.getBlockHash(id);

            if (blockHash.toHuman() == 0) {
                return null;
            }

            return await this.api.rpc.chain.getBlock(blockHash);
        } catch (e) {
            return null;
        }
    }

    // Process chain //

    async processChain() {
        let blockNumber = 0;

        while (true) {
            const block = await this.retrieveBlock(blockNumber);

            if (block == null) {
                await new Promise(resolve => setTimeout(resolve, 1000));

                continue;
            }

            await this.processBlock(block.block);

            blockNumber++;
        }
    }

    // Event handlers //

    addEventHandler(handler: EventListener) {
        this.eventHandlers.push(handler);
    }

    addEventHandlers(...handlers: Array<EventListener>) {
        handlers.forEach(handler => this.addEventHandler(handler));
    }

    // Process extrinsic //

    async processExtrinsic(extrinsic: any) {
        console.log(extrinsic.toHuman());

        console.log(extrinsic.method.args.toString());

        const [
            dest,
            value,
            gasLimit,
            storageLimit,
            data
        ] = extrinsic.method.args;

        // if (this.filterAddresses.length > 0 && !this.filterAddresses.includes(dest.toString())) {
        //     return;
        // }

        const dotEvent = {
            target: dest.toString(),
            data: data.toU8a()
        } as DotEvent;

        for (const handler of this.eventHandlers) {
            console.log("dotEvent", dotEvent);
            const filter = await handler.filter(dotEvent);

            if (filter) {
                await handler.handle(extrinsic);
            }
        }
    }
}

