import { EventListenerImpl } from '../event-listener';
import EVENT_DATA_TYPE_DESCRIPTIONS from '@archisinal/contracts/dist/typechain-generated/event-data/arch_nft.json';
import { convertEvent } from '../event';
import chalk from 'chalk';
import * as ReturnTypes from '@archisinal/contracts/dist/typechain-generated/event-types/arch_nft';
import prisma from '@archisinal/db';
import { Block } from '@polkadot/types/interfaces';
import { getBlockTimestamp, idToString } from '../../utils';
import ArchNFTAbi from '@archisinal/contracts/dist/artifacts/arch_nft.json';

export class ArchNftListener extends EventListenerImpl {
  constructor(address: string) {
    super(address, ArchNFTAbi);
    console.log(`🎉 Created ArchNftListener <${address}>`);
  }

  async Transfer(args: any, block: Block): Promise<void> {
    const event = (await convertEvent(
      args,
      'Transfer',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.Transfer;
    const tokenId = idToString(event.tokenId);

    const nft = await prisma.nFT.findFirst({
      where: {
        collection: this.address,
        id_in_collection: tokenId,
      },
    });

    const minted_at = await getBlockTimestamp(block.header.hash.toString());

    if (event.from === null) {
      await prisma.nFT.create({
        data: {
          id_in_collection: tokenId,
          owner: (event.to ?? '').toString(),
          collection: this.address,
          creator: (event.to ?? '').toString(),
          img_url: '',
          minted_at,
        },
      });
    }

    await prisma.nFT.updateMany({
      where: {
        id_in_collection: tokenId,
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

    await prisma.approval.create({
      data: {
        owner: event.owner.toString(),
        operator: event.spender.toString(),
        token_id: idToString(event.tokenId),
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

    await prisma.collection.updateMany({
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

    await prisma.collection.updateMany({
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

    await prisma.collection.updateMany({
      where: {
        address: this.address,
      },
      data: {
        metadata: event.additionalInfo.toString(),
      },
    });

    console.log(chalk.red('✨  SetCollectionAdditionalInfo'), event);
  }

  async NFTMetadataSet(args: any, block: Block): Promise<void> {
    const event = (await convertEvent(
      args,
      'NFTMetadataSet',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.NFTMetadataSet;

    await prisma.nFT.updateMany({
      where: {
        collection: this.address,
        id_in_collection: idToString(event.id),
      },
      data: {
        metadata: event.value.toString(),
      },
    });

    console.log(chalk.red('✨  NFTMetadataSet'), event);
  }
}
