import {EventListenerImpl} from "./event-listener";

export class AccountManagerListener extends EventListenerImpl {
    constructor(address: string) {
        super(address);
    }

    async AccountCreated(args: Array<any>): Promise<void> {
        console.log("AccountCreated", args.toString());
    }

    async CreatorAccountCreated(args: Array<any>): Promise<void> {
        console.log("CreatorAccountCreated", args.toString());
    }

    async CodeHashSet(args: Array<any>): Promise<void> {
        console.log("CodeHashSet", args.toString());
    }

    async AdminAdded(args: Array<any>): Promise<void> {
        console.log("AdminAdded", args.toString());
    }

    async AdminRemoved(args: Array<any>): Promise<void> {
        console.log("AdminRemoved", args.toString());
    }
}
