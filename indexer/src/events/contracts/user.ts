import { EventListenerImpl } from '../event-listener';
import { convertEvent } from '../event';
import EVENT_DATA_TYPE_DESCRIPTIONS from 'archisinal/dist/typechain-generated/event-data/user.json';
import chalk from 'chalk';
import * as ReturnTypes from 'archisinal/typechain-generated/event-types/user';
import UserABI from 'archisinal/dist/artifacts/user.json';

export class UserListener extends EventListenerImpl {
  constructor(address: string) {
    super(address, UserABI);
    console.log('🎉 Created UserListener');
  }

  async UserDataSet(args: any): Promise<void> {
    const event = (await convertEvent(
      args,
      'UserDataSet',
      EVENT_DATA_TYPE_DESCRIPTIONS,
    )) as ReturnTypes.UserDataSet;

    console.log(chalk.red('✨  UserDataSet'), event);
  }
}
