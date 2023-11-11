import {EventListenerImpl} from "../event-listener";

export class UserListener extends EventListenerImpl {
    constructor(address: string, abi: any) {
        super(address, abi);
    }

    async UserDataSet(args: Array<any>): Promise<void> {
        console.log("UserDataSet", args.toString());
    }
}
