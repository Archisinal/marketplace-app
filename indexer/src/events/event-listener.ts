import { DotEvent } from './event';
import { Abi } from '@polkadot/api-contract';
import { Block } from '@polkadot/types/interfaces';

export interface EventListener {
  filter(event: DotEvent): Promise<boolean>;

  handle(event: DotEvent, block: Block): Promise<void>;
}

export class EventListenerImpl implements EventListener {
  protected readonly address: string;
  protected abi: any;

  constructor(address: string, abi: any) {
    this.address = address;
    this.abi = abi;
  }

  async filter(event: DotEvent): Promise<boolean> {
    return event.target === this.address;
  }

  async handle(event: DotEvent, block: Block): Promise<void> {
    try {
      const abi = new Abi(this.abi);

      const decoded = abi.decodeEvent(event.data);
      const identifier = decoded.event.identifier.toString();
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
