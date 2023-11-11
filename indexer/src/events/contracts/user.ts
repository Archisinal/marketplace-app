import { EventListenerImpl } from '../event-listener';
import { convertEvent } from '../event';
import EVENT_DATA_TYPE_DESCRIPTIONS from 'archisinal/dist/typechain-generated/event-data/user.json';
import chalk from 'chalk';

export class UserListener extends EventListenerImpl {
  constructor(address: string, abi: any) {
    super(address, abi);
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
