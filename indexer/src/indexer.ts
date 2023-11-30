import { ApiPromise } from '@polkadot/api';
import { Block } from '@polkadot/types/interfaces';
import chalk from 'chalk';
import * as readline from 'readline';
import { EventListeners } from './events';
import { updateLastAnalyzedBlock } from './db/utils';
import { prisma } from './primsa';

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

    const blockEvents = await this.api.query.system.events.at(block.hash);

    let filtered = (blockEvents as any).filter((event: any) => {
      if (event.event.method === 'ContractEmitted') {
        return true;
      }
      return false;
    });

    for (const extrinsic of filtered) {
      await this.processExtrinsic(block, extrinsic);
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
    // let blockNumber = (
    //   (await prisma.blockProgress.findFirst({
    //     where: {
    //       id: 1,
    //     },
    //   })) ?? { lastAnalyzedBlock: BigInt(0) }
    // ).lastAnalyzedBlock as unknown as number;

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

      try {
        await this.processBlock(block.block);
        await updateLastAnalyzedBlock(blockNumber);
      } catch (e) {
        console.log(e);
      }

      blockNumber++;
    }
  }

  // Process extrinsic //

  async processExtrinsic(block: Block, extrinsic: any) {
    for (const handler of EventListeners.getListeners()) {
      const filter = await handler.filter(extrinsic);

      if (filter) {
        await handler.handle(extrinsic, block);
      }
    }
  }
}
