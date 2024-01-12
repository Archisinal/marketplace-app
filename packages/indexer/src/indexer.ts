import {ApiPromise, WsProvider} from '@polkadot/api';
import {Block} from '@polkadot/types/interfaces';
import chalk from 'chalk';
import * as readline from 'readline';
import {EventListeners} from './events';
import {updateLastAnalyzedBlock} from './db/utils';
import prisma from '@archisinal/db';
import ApiSingleton from '@archisinal/contracts/dist/test/shared/api_singleton';

export class PolkadotIndexer {
  // @ts-ignore
  api: ApiPromise;

  // Construct //
  constructor() {}

  async init(rpcUrl: string) {
    try {
      console.log('Connecting to provider: ', rpcUrl)
      const wsProvider = new WsProvider(rpcUrl);

      this.api = await ApiPromise.create({
        provider: wsProvider,
      });

      await ApiSingleton.initWithApi(this.api);

      console.log('Connected to provider: ', rpcUrl)
    } catch (e) {
      console.log(e);
    }

    await this.api.isReady;
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

  async retrieveBlock(id: number | bigint) {
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

  async getLastAnalyzedBlock(): Promise<bigint> {
    return (
      (await prisma.blockProgress.findFirst({
        where: {
          id: 1,
        },
      })) ?? { lastAnalyzedBlock: BigInt(0) }
    ).lastAnalyzedBlock as unknown as bigint;
  }

  async processChain(startFirstBlock = false, forcedBlock?: bigint) {
    if (forcedBlock) {
        console.log(
            chalk.blue('========= ⚠️  ') +
            chalk.green('Forced block: ') +
            chalk.yellow(forcedBlock.toString()) +
            ' ⚠️ =========',
        );
    }

    let blockNumber = forcedBlock ? forcedBlock : startFirstBlock
        ? 0
        : (await this.getLastAnalyzedBlock()) + BigInt(1);
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
