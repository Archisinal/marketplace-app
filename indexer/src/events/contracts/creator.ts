import { EventListenerImpl } from '../event-listener';
import { convertEvent } from '../event';
import EVENT_DATA_TYPE_DESCRIPTIONS from 'archisinal/dist/typechain-generated/event-data/creator.json';
import chalk from 'chalk';

export class CreatorListener extends EventListenerImpl {
  constructor(address: string, abi: any) {
    super(address, abi);
  }

  async CollectionCreated(args: any): Promise<void> {
    const event = await convertEvent(
      args,
      'CollectionCreated',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    );

    console.log(chalk.red('✨  CollectionCreated'), event);
  }

  async UserDataSet(args: any): Promise<void> {
    const event = await convertEvent(
      args,
      'UserDataSet',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    );

    console.log(chalk.red('✨  UserDataSet'), event);
  }
}
