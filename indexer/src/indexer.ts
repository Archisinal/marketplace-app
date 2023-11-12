import { ApiPromise } from '@polkadot/api';
import { Block } from '@polkadot/types/interfaces';
import { DotEvent } from './events/event';
import chalk from 'chalk';
import * as readline from 'readline';
import { EventListeners } from './events';
import { updateLastAnalyzedBlock } from './db/utils';

export class PolkadotIndexer {
  api: ApiPromise;

  // Construct //
  constructor() {
    this.api = new ApiPromise();
  }

  async init() {
    this.api = await ApiPromise.create();
  }

  static async create() {
    const indexer = new PolkadotIndexer();
    await indexer.init();
    return indexer;
  }

  // Process block //

  async processBlock(block: Block) {
    console.log(
      chalk.blue('========= 🧱'),
      chalk.green('Processing block with number: '),
      chalk.yellow(block.header.number.toString()),
      chalk.blue('🧱 ========='),
    );

    const extrinsics = block.extrinsics;

    const blockEvents = await this.api.query.system.events.at(block.hash);

    let filtered = (blockEvents as any).filter((event: any) => {
      if (event.event.method === 'ContractEmitted') {
        return true;
      }
      return false;
    });

    let fileredEvents = filtered.map((event: any) => {
      let data = event.event.data[1].toU8a();

      let result = [];

      for (let i = 1; i < data.length; i++) {
        result.push(data[i]);
      }

      return {
        target: event.event.data[0].toString(),
        data: Uint8Array.from(result),
      };
    });

    const filteredExtrinsics = extrinsics.filter((extrinsic) => {
      return (
        extrinsic.method.section === 'contracts' &&
        extrinsic.method.method === 'call'
      );
    });

    for (const extrinsic of fileredEvents) {
      await this.processExtrinsic(extrinsic);
    }
  }

  async retrieveBlock(id: number) {
    try {
      const blockHash = await this.api.rpc.chain.getBlockHash(id);

      if (blockHash.toHuman() == 0) {
        return null;
      }

      return await this.api.rpc.chain.getBlock(blockHash);
    } catch (e) {
      return null;
    }
  }

  // Process chain //

  async processChain() {
    let blockNumber = 0;

    let waiting_count = 0;

    while (true) {
      const block = await this.retrieveBlock(blockNumber);

      if (block == null) {
        process.stdout.write(
          chalk.blue('========= ⏳  ') +
            chalk.green('Waiting for block with number: ') +
            chalk.yellow(blockNumber.toString()) +
            '.'.repeat(waiting_count),
        );

        waiting_count = (waiting_count + 1) % 4;

        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Clear line
        readline.cursorTo(process.stdout, 0);
        readline.clearLine(process.stdout, 0);

        continue;
      }

      waiting_count = 0;

      await this.processBlock(block.block);

      await updateLastAnalyzedBlock(blockNumber);

      blockNumber++;
    }
  }

  // Process extrinsic //

  async processExtrinsic(extrinsic: { data: Uint8Array; target: string }) {
    const dotEvent: DotEvent = {
      data: extrinsic.data,
      target: extrinsic.target,
    };

    for (const handler of EventListeners.getListeners()) {
      const filter = await handler.filter(dotEvent);

      if (filter) {
        await handler.handle(extrinsic);
      }
    }
  }
}
