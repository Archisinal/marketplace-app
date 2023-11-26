import { EventListenerImpl } from '../event-listener';
import { Block } from '@polkadot/types/interfaces';
import { convertEvent } from '../event';
import EVENT_DATA_TYPE_DESCRIPTIONS from 'archisinal/dist/typechain-generated/event-data/collection_fabric.json';
import * as ReturnTypes from 'archisinal/typechain-generated/event-types/collection_fabric';
import { prisma } from '../../primsa';
import chalk from 'chalk';

export class ArchNftListener extends EventListenerImpl {
  constructor(address: string, abi: any) {
    super(address, abi);
  }

  async CollectionInstantiated(args: any, block: Block): Promise<void> {
    const event = (await convertEvent(
      args,
      'CollectionInstantiated',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.CollectionInstantiated;

    await prisma.collections.create({
      data: {
        collection: event.collection.toString(),
        collection_index: event.index.toString(),
        is_whitelisted: false,
        is_blacklisted: false,
      },
    });

    console.log(chalk.red('✨  CollectionInstantiated'), event);
  }

  async CollectionBanned(args: any, block: Block): Promise<void> {
    const event = (await convertEvent(
      args,
      'CollectionBanned',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.CollectionBanned;

    await prisma.collections.update({
      where: {
        collection: event.collection.toString(),
      },
      data: {
        is_blacklisted: true,
      },
    });

    await console.log(chalk.red('✨  CollectionBanned'), event);
  }

  async CollectionUnbanned(args: any, block: Block): Promise<void> {
    const event = (await convertEvent(
      args,
      'CollectionUnbanned',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.CollectionUnbanned;

    await prisma.collections.update({
      where: {
        collection: event.collection.toString(),
      },
      data: {
        is_blacklisted: false,
      },
    });

    console.log(chalk.red('✨  CollectionUnbanned'), event);
  }

  async CodehashBanned(args: any, block: Block): Promise<void> {
    const event = (await convertEvent(
      args,
      'CodehashBanned',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.CodehashBanned;

    await prisma.codeHashes.upsert({
      where: {
        codeHash: event.codeHash.toString(),
      },
      update: {
        is_blacklisted: true,
      },
      create: {
        codeHash: event.codeHash.toString(),
        is_blacklisted: true,
      },
    });

    console.log(chalk.red('✨  CodehashBanned'), event);
  }

  async CodehashUnbanned(args: any, block: Block): Promise<void> {
    const event = (await convertEvent(
      args,
      'CodehashUnbanned',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.CodehashUnbanned;

    await prisma.codeHashes.upsert({
      where: {
        codeHash: event.codeHash.toString(),
      },
      update: {
        is_blacklisted: false,
      },
      create: {
        codeHash: event.codeHash.toString(),
        is_blacklisted: false,
      },
    });

    console.log(chalk.red('✨  CodehashUnbanned'), event);
  }

  async CollectionWhiteListed(args: any, block: Block): Promise<void> {
    const event = (await convertEvent(
      args,
      'CollectionWhiteListed',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.CollectionWhiteListed;

    await prisma.collections.upsert({
      where: {
        collection: event.collection.toString(),
      },
      update: {
        is_whitelisted: true,
      },
      create: {
        collection: event.collection.toString(),
        is_whitelisted: true,
        is_blacklisted: false,
      },
    });

    console.log(chalk.red('✨  CollectionWhiteListed'), event);
  }

  async CollectionUnWhiteListed(args: any, block: Block): Promise<void> {
    const event = (await convertEvent(
      args,
      'CollectionUnWhiteListed',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.CollectionUnWhiteListed;

    await prisma.collections.upsert({
      where: {
        collection: event.collection.toString(),
      },
      update: {
        is_whitelisted: false,
      },
      create: {
        collection: event.collection.toString(),
        is_whitelisted: false,
        is_blacklisted: false,
      },
    });

    console.log(chalk.red('✨  CollectionUnWhiteListed'), event);
  }

  async WhitelistEnabled(args: any, block: Block): Promise<void> {
    const event = (await convertEvent(
      args,
      'WhitelistEnabled',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.WhitelistEnabled;

    await prisma.whiteListEnabled.upsert({
      where: {
        id: 1,
      },
      update: {
        enabled: event.enabled,
      },
      create: {
        id: 1,
        enabled: event.enabled,
      },
    });

    console.log(chalk.red('✨  WhitelistEnabled'), event);
  }

  async AdminAdded(args: any, block: Block): Promise<void> {
    const event = (await convertEvent(
      args,
      'AdminAdded',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.AdminAdded;

    console.log(chalk.red('✨  AdminAdded'), event);
  }

  async AdminRemoved(args: any, block: Block): Promise<void> {
    const event = (await convertEvent(
      args,
      'AdminRemoved',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.AdminRemoved;

    console.log(chalk.red('✨  AdminRemoved'), event);
  }
}
