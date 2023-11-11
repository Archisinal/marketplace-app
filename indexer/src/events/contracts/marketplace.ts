import {EventListenerImpl} from "../event-listener";

export class MarketplaceListener extends EventListenerImpl {
    constructor(address: string) {
        super(address);
    }

    async ListNFT(args: Array<any>): Promise<void> {
        console.log("ListNFT", args.toString());
    }

    async CancelListing(args: Array<any>): Promise<void> {
        console.log("CancelListing", args.toString());
    }

    async BuyNFT(args: Array<any>): Promise<void> {
        console.log("BuyNFT", args.toString());
    }

    async BuyBatch(args: Array<any>): Promise<void> {
        console.log("BuyBatch", args.toString());
    }

    async AuctionCreated(args: Array<any>): Promise<void> {
        console.log("AuctionCreated", args.toString());
    }

    async CancelAuction(args: Array<any>): Promise<void> {
        console.log("CancelAuction", args.toString());
    }

    async BidPlaced(args: Array<any>): Promise<void> {
        console.log("BidPlaced", args.toString());
    }

    async NFTClaimed(args: Array<any>): Promise<void> {
        console.log("NFTClaimed", args.toString());
    }

    async NoBids(args: Array<any>): Promise<void> {
        console.log("NoBids", args.toString());
    }

    async StartAuction(args: Array<any>): Promise<void> {
        console.log("StartAuction", args.toString());
    }

    async EndAuction(args: Array<any>): Promise<void> {
        console.log("EndAuction", args.toString());
    }

    async AdminAdded(args: Array<any>): Promise<void> {
        console.log("AdminAdded", args.toString());
    }

    async AdminRemoved(args: Array<any>): Promise<void> {
        console.log("AdminRemoved", args.toString());
    }
}
