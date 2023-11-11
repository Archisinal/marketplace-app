import {EventListenerImpl} from "../event-listener";
import {handleEventReturn} from "@727-ventures/typechain-types";
import {getEventTypeDescription} from "../../../typechain-generated/shared/utils";
import EVENT_DATA_TYPE_DESCRIPTIONS from "../../../typechain-generated/event-data/arch_nft.json";
import {convertEvent} from "../event";
import chalk from "chalk";

export class ArchNftListener extends EventListenerImpl {
    constructor(address: string, abi: any) {
        super(address, abi);
    }

    async Transfer(args: any): Promise<void> {
        console.log(this.abi.events)
        const event = await convertEvent(args, "Transfer", EVENT_DATA_TYPE_DESCRIPTIONS);

        console.log(chalk.red("✨  Transfer"), event);
    }

    async Approval(args: any): Promise<void> {
        const event = await convertEvent(args, "Approval", EVENT_DATA_TYPE_DESCRIPTIONS);

        console.log(chalk.red("✨  Approval"), event);
    }

    async SetCollectionName(args: any): Promise<void> {
        const event = await convertEvent(args, "SetCollectionName", EVENT_DATA_TYPE_DESCRIPTIONS);

        console.log(chalk.red("✨  SetCollectionName"), event);
    }

    async SetCollectionUri(args: any): Promise<void> {
        const event = await convertEvent(args, "SetCollectionUri", EVENT_DATA_TYPE_DESCRIPTIONS);

        console.log(chalk.red("✨  SetCollectionUri"), event);
    }

    async SetCollectionAdditionalInfo(args: any): Promise<void> {
        const event = await convertEvent(args, "SetCollectionAdditionalInfo", EVENT_DATA_TYPE_DESCRIPTIONS);

        console.log(chalk.red("✨  SetCollectionAdditionalInfo"), event);
    }

    async SetAttribute(args: any): Promise<void> {
        const event = await convertEvent(args, "SetAttribute", EVENT_DATA_TYPE_DESCRIPTIONS);

        console.log(chalk.red("✨  SetAttribute"), event);
    }
}
