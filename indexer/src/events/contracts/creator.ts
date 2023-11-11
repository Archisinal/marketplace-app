import {EventListenerImpl} from "../event-listener";

export class CreatorListener extends EventListenerImpl {
    constructor(address: string, abi: any) {
        super(address, abi);
    }

    async CollectionCreated(args: Array<any>): Promise<void> {
        console.log("CollectionCreated", args.toString());
    }

    async UserDataSet(args: Array<any>): Promise<void> {
        console.log("UserDataSet", args.toString());
    }
}
