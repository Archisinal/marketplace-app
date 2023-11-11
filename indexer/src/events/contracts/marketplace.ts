import {EventListenerImpl} from "../event-listener";
import {convertEvent} from "../event";
import EVENT_DATA_TYPE_DESCRIPTIONS from "../../../typechain-generated/event-data/marketplace.json";
import chalk from "chalk";

export class MarketplaceListener extends EventListenerImpl {
    constructor(address: string, abi: any) {
        super(address, abi);
    }

    async ListNFT(args: any): Promise<void> {
        const event = await convertEvent(args, "ListNFT", EVENT_DATA_TYPE_DESCRIPTIONS);

        console.log(chalk.red("✨  Transfer"), event);
    }

    async CancelListing(args: any): Promise<void> {
        const event = await convertEvent(args, "CancelListing", EVENT_DATA_TYPE_DESCRIPTIONS);

        console.log(chalk.red("✨  CancelListing"), event);
    }

    async BuyNFT(args: any): Promise<void> {
        const event = await convertEvent(args, "BuyNFT", EVENT_DATA_TYPE_DESCRIPTIONS);

        console.log(chalk.red("✨  BuyNFT"), event);
    }

    async BuyBatch(args: any): Promise<void> {
        const event = await convertEvent(args, "BuyBatch", EVENT_DATA_TYPE_DESCRIPTIONS);

        console.log(chalk.red("✨  BuyBatch"), event);
    }

    async AuctionCreated(args: any): Promise<void> {
        const event = await convertEvent(args, "AuctionCreated", EVENT_DATA_TYPE_DESCRIPTIONS);

        console.log(chalk.red("✨  AuctionCreated"), event);
    }

    async CancelAuction(args: any): Promise<void> {
        const event = await convertEvent(args, "CancelAuction", EVENT_DATA_TYPE_DESCRIPTIONS);

        console.log(chalk.red("✨  CancelAuction"), event);
    }

    async BidPlaced(args: any): Promise<void> {
        const event = await convertEvent(args, "BidPlaced", EVENT_DATA_TYPE_DESCRIPTIONS);

        console.log(chalk.red("✨  BidPlaced"), event);
    }

    async NFTClaimed(args: any): Promise<void> {
        const event = await convertEvent(args, "NFTClaimed", EVENT_DATA_TYPE_DESCRIPTIONS);

        console.log(chalk.red("✨  NFTClaimed"), event);
    }

    async NoBids(args: any): Promise<void> {
        const event = await convertEvent(args, "NoBids", EVENT_DATA_TYPE_DESCRIPTIONS);

        console.log(chalk.red("✨  NoBids"), event);
    }

    async StartAuction(args: any): Promise<void> {
        const event = await convertEvent(args, "StartAuction", EVENT_DATA_TYPE_DESCRIPTIONS);

        console.log(chalk.red("✨  StartAuction"), event);
    }

    async EndAuction(args: any): Promise<void> {
        const event = await convertEvent(args, "EndAuction", EVENT_DATA_TYPE_DESCRIPTIONS);

        console.log(chalk.red("✨  EndAuction"), event);
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
