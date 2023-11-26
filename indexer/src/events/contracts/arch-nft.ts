import { EventListenerImpl } from '../event-listener';
import EVENT_DATA_TYPE_DESCRIPTIONS from 'archisinal/dist/typechain-generated/event-data/arch_nft.json';
import { convertEvent } from '../event';
import chalk from 'chalk';
import * as ReturnTypes from 'archisinal/typechain-generated/event-types/arch_nft';
import { prisma } from '../../primsa';
import { Block } from '@polkadot/types/interfaces';
import { getBlockTimestamp } from '../../utils';

export class ArchNftListener extends EventListenerImpl {
  constructor(address: string, abi: any) {
    super(address, abi);
  }

  async Transfer(args: any, block: Block): Promise<void> {
    const event = (await convertEvent(
      args,
      'Transfer',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.Transfer;

    const nft = await prisma.nFT.findFirst({
      where: {
        collection: this.address,
        id_in_collection: event.tokenId.toString(),
      },
    });

    const minted_at = await getBlockTimestamp(block.hash.toString());

    // todo: update address
    if (event.from?.toString() === '0x000000') {
      prisma.nFT.create({
        data: {
          id_in_collection: event.tokenId.toString(),
          owner: (event.to ?? '').toString(),
          collection: this.address,
          creator: (event.to ?? '').toString(),
          img_url: '',
          minted_at,
        },
      });
    }

    prisma.nFT.updateMany({
      where: {
        id_in_collection: event.tokenId.toString(),
      },
      data: {
        owner: (event.to ?? '').toString(),
      },
    });

    console.log(chalk.red('✨  Transfer'), event);
  }

  async Approval(args: any, block: Block): Promise<void> {
    const event = (await convertEvent(
      args,
      'Approval',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.Approval;

    prisma.approval.create({
      data: {
        owner: event.owner.toString(),
        operator: event.spender.toString(),
        token_id: event.tokenId.toString(),
        approved: true,
      },
    });

    console.log(chalk.red('✨  Approval'), event);
  }

  async SetCollectionName(args: any, block: Block): Promise<void> {
    const event = (await convertEvent(
      args,
      'SetCollectionName',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.SetCollectionName;

    prisma.collection.updateMany({
      where: {
        address: this.address,
      },
      data: {
        name: event.name.toString(),
      },
    });

    console.log(chalk.red('✨  SetCollectionName'), event);
  }

  async SetCollectionUri(args: any, block: Block): Promise<void> {
    const event = (await convertEvent(
      args,
      'SetCollectionUri',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.SetCollectionUri;

    prisma.collection.updateMany({
      where: {
        address: this.address,
      },
      data: {
        uri: event.uri.toString(),
      },
    });

    console.log(chalk.red('✨  SetCollectionUri'), event);
  }

  async SetCollectionAdditionalInfo(args: any, block: Block): Promise<void> {
    const event = (await convertEvent(
      args,
      'SetCollectionAdditionalInfo',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.SetCollectionAdditionalInfo;

    prisma.collection.updateMany({
      where: {
        address: this.address,
      },
      data: {
        metadata: event.additionalInfo.toString(),
      },
    });

    console.log(chalk.red('✨  SetCollectionAdditionalInfo'), event);
  }

  async SetAttribute(args: any, block: Block): Promise<void> {
    const event = (await convertEvent(
      args,
      'SetAttribute',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.SetAttribute;

    console.log(chalk.red('✨  SetAttribute'), event);
  }
}
