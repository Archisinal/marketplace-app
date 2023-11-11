import {EventListenerImpl} from "../event-listener";

export class ArchNftListener extends EventListenerImpl {
    constructor(address: string) {
        super(address);
    }

    async Transfer(args: Array<any>): Promise<void> {
        console.log("Transfer", args.toString());
    }

    async Approval(args: Array<any>): Promise<void> {
        console.log("Approval", args.toString());
    }

    async SetCollectionName(args: Array<any>): Promise<void> {
        console.log("SetCollectionName", args.toString());
    }

    async SetCollectionUri(args: Array<any>): Promise<void> {
        console.log("SetCollectionUri", args.toString());
    }

    async SetCollectionAdditionalInfo(args: Array<any>): Promise<void> {
        console.log("SetCollectionAdditionalInfo", args.toString());
    }

    async SetAttribute(args: Array<any>): Promise<void> {
        console.log("SetAttribute", args.toString());
    }
}
