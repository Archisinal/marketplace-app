import { EventListenerImpl } from '../event-listener';
import { convertEvent } from '../event';
import EVENT_DATA_TYPE_DESCRIPTIONS from 'archisinal/dist/typechain-generated/event-data/account_manager.json';
import chalk from 'chalk';
import * as ReturnTypes from 'archisinal/typechain-generated/event-types/account_manager';
import Contract from 'archisinal/typechain-generated/contracts/account_manager';
import { prisma } from '../../primsa';
import { Signers } from '../../signers';

export class AccountManagerListener extends EventListenerImpl {
  private contract: Contract;
  constructor(address: string, abi: any) {
    super(address, abi);

    this.contract = new Contract(address, Signers.defaultSigner, abi);
  }

  async AccountCreated(args: any): Promise<void> {
    const event = (await convertEvent(
      args,
      'AccountCreated',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.AccountCreated;

    prisma.user.create({
      data: {
        contract_address: event.contractId.toString(),
        address: event.accountId.toString(),
        is_creator: false,
      },
    });

    console.log(chalk.red('✨  Transfer'), event);
  }

  async CreatorAccountCreated(args: any): Promise<void> {
    const event = await convertEvent(
      args,
      'CreatorAccountCreated',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    );

    prisma.user.create({
      data: {
        contract_address: event.contractId.toString(),
        address: event.accountId.toString(),
        is_creator: true,
      },
    });

    console.log(chalk.red('✨  CreatorAccountCreated'), event);
  }

  async CodeHashSet(args: any): Promise<void> {
    const event = await convertEvent(
      args,
      'CodeHashSet',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    );

    console.log(chalk.red('✨  CodeHashSet'), event);
  }

  async AdminAdded(args: any): Promise<void> {
    const event = await convertEvent(
      args,
      'AdminAdded',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    );

    console.log(chalk.red('✨  AdminAdded'), event);
  }

  async AdminRemoved(args: any): Promise<void> {
    const event = await convertEvent(
      args,
      'AdminRemoved',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    );

    console.log(chalk.red('✨  AdminRemoved'), event);
  }
}
