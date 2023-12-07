import { EventListenerImpl } from '../event-listener';
import { Block } from '@polkadot/types/interfaces';
import { convertEvent } from '../event';
import EVENT_DATA_TYPE_DESCRIPTIONS from 'archisinal/dist/typechain-generated/event-data/collection_fabric.json';
import * as ReturnTypes from 'archisinal/typechain-generated/event-types/collection_fabric';
import prisma from '@archisinal/db';
import chalk from 'chalk';
import { EventListeners } from '../../events';
import CollectionFabricABI from 'archisinal/dist/artifacts/collection_fabric.json';
import { ArchNftListener } from './arch-nft';

export class CollectionFabricListener extends EventListenerImpl {
  constructor(address: string) {
    super(address, CollectionFabricABI);
    console.log(`🎉 Created ArchNftListener <${address}>`);
  }

  async CollectionInstantiated(args: any, block: Block): Promise<void> {
    const event = (await convertEvent(
      args,
      'CollectionInstantiated',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.CollectionInstantiated;

    const address = event.collection.toString();

    await prisma.collections.create({
      data: {
        collection: address,
        collection_index: event.index.toString(),
        is_whitelisted: false,
        is_blacklisted: false,
      },
    });

    // add collection to event listeners

    EventListeners.addListeners(new ArchNftListener(address));

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

    console.log(chalk.red('✨  CollectionBanned'), event);
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

    await prisma.admins.create({
      data: {
        admin: event.accountId.toString(),
        contract_address: this.address,
      },
    });

    console.log(chalk.red('✨  AdminAdded'), event);
  }

  async AdminRemoved(args: any, block: Block): Promise<void> {
    const event = (await convertEvent(
      args,
      'AdminRemoved',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.AdminRemoved;

    await prisma.admins.deleteMany({
      where: {
        admin: event.accountId.toString(),
        contract_address: this.address,
      },
    });

    console.log(chalk.red('✨  AdminRemoved'), event);
  }
}
