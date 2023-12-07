import { Abi } from '@polkadot/api-contract';
import { Block } from '@polkadot/types/interfaces';

export interface EventListener {
  filter(event: any): Promise<boolean>;

  handle(event: any, block: Block): Promise<void>;
}

export class EventListenerImpl implements EventListener {
  protected readonly address: string;
  protected abi: any;

  constructor(address: string, abi: any) {
    this.address = address;
    this.abi = abi;
  }

  async filter(event: any): Promise<boolean> {
    return event.event.data[0].toString() === this.address;
  }

  async handle(event: any, block: Block): Promise<void> {
    try {
      const abi = new Abi(this.abi);

      const decoded = abi.decodeEvent(event.event.data[1]);
      const identifier = decoded.event.identifier.toString();

      console.log(`Dispatching event: ${identifier}`);

      const args = {
        inputs: decoded.event.args,
        values: decoded.args,
      };

      if (identifier in this) {
        // @ts-ignore
        await this[identifier](args, block);
      } else {
        console.warn('Unknown event', identifier);
      }
    } catch (e) {
      console.error(e);
    }
  }
}
