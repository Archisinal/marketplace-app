import { EventListenerImpl } from '../event-listener';
import { convertEvent } from '../event';
import EVENT_DATA_TYPE_DESCRIPTIONS from '@archisinal/contracts/dist/typechain-generated/event-data/account_manager.json';
import chalk from 'chalk';
import * as ReturnTypes from '@archisinal/contracts/dist/typechain-generated/event-types/account_manager';
import prisma from '@archisinal/db';
import AccountManagerABI from '@archisinal/contracts/dist/artifacts/account_manager.json';
import { EventListeners } from '../../events';
import { CreatorListener } from './creator';
import { UserListener } from './user';
import { formatAddressSS58 } from '../../utils';

export class AccountManagerListener extends EventListenerImpl {
  constructor(address: string) {
    super(address, AccountManagerABI);
    console.log(`🎉 Created AccountManagerListener <${address}>`);
  }

  async AccountCreated(args: any): Promise<void> {
    const event = (await convertEvent(
      args,
      'AccountCreated',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.AccountCreated;

    const contractAddress = event.contractId.toString();
    const accountAddress = event.accountId.toString();

    EventListeners.addListeners(new UserListener(accountAddress));

    await prisma.user.create({
      data: {
        contract_address: contractAddress,
        address: await formatAddressSS58(accountAddress),
        is_creator: false,
      },
    });

    console.log(chalk.red('✨  Transfer'), event);
  }

  async CreatorAccountCreated(args: any): Promise<void> {
    const event = (await convertEvent(
      args,
      'CreatorAccountCreated',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.CreatorAccountCreated;

    const creatorAddress = event.accountId.toString();
    const accountAddress = event.accountId.toString();

    EventListeners.addListeners(new CreatorListener(creatorAddress));

    await prisma.user.create({
      data: {
        contract_address: await formatAddressSS58(creatorAddress),
        address: await formatAddressSS58(accountAddress),
        is_creator: true,
      },
    });

    console.log(chalk.red('✨  CreatorAccountCreated'), event);
  }

  async CodeHashSet(args: any): Promise<void> {
    const event = (await convertEvent(
      args,
      'CodeHashSet',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.CodeHashSet;

    console.log(chalk.red('✨  CodeHashSet'), event);
  }

  async AdminAdded(args: any): Promise<void> {
    const event = (await convertEvent(
      args,
      'AdminAdded',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.AdminAdded;

    await prisma.admins.create({
      data: {
        admin: await formatAddressSS58(event.accountId.toString()),
        contract_address: this.address,
      },
    });

    console.log(chalk.red('✨  AdminAdded'), event);
  }

  async AdminRemoved(args: any): Promise<void> {
    const event = (await convertEvent(
      args,
      'AdminRemoved',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.AdminRemoved;

    await prisma.admins.deleteMany({
      where: {
        admin: await formatAddressSS58(event.accountId.toString()),
        contract_address: this.address,
      },
    });

    console.log(chalk.red('✨  AdminRemoved'), event);
  }
}
