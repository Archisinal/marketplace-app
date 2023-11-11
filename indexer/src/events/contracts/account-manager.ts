import {EventListenerImpl} from "../event-listener";
import {convertEvent} from "../event";
import EVENT_DATA_TYPE_DESCRIPTIONS from "../../../typechain-generated/event-data/account_manager.json";
import chalk from "chalk";

export class AccountManagerListener extends EventListenerImpl {
    constructor(address: string, abi: any) {
        super(address, abi);
    }

    async AccountCreated(args: any): Promise<void> {
        const event = await convertEvent(args, "AccountCreated", EVENT_DATA_TYPE_DESCRIPTIONS);

        console.log(chalk.red("✨  Transfer"), event);
    }

    async CreatorAccountCreated(args: any): Promise<void> {
        const event = await convertEvent(args, "CreatorAccountCreated", EVENT_DATA_TYPE_DESCRIPTIONS);

        console.log(chalk.red("✨  CreatorAccountCreated"), event);
    }

    async CodeHashSet(args: any): Promise<void> {
        const event = await convertEvent(args, "CodeHashSet", EVENT_DATA_TYPE_DESCRIPTIONS);

        console.log(chalk.red("✨  CodeHashSet"), event);
    }

    async AdminAdded(args: any): Promise<void> {
        const event = await convertEvent(args, "AdminAdded", EVENT_DATA_TYPE_DESCRIPTIONS);

        console.log(chalk.red("✨  AdminAdded"), event);
    }

    async AdminRemoved(args: any): Promise<void> {
        const event = await convertEvent(args, "AdminRemoved", EVENT_DATA_TYPE_DESCRIPTIONS);

        console.log(chalk.red("✨  AdminRemoved"), event);
    }
}
