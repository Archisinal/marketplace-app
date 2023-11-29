import { EventListenerImpl } from '../event-listener';
import { convertEvent } from '../event';
import EVENT_DATA_TYPE_DESCRIPTIONS from 'archisinal/dist/typechain-generated/event-data/creator.json';
import chalk from 'chalk';
import * as ReturnTypes from 'archisinal/typechain-generated/event-types/creator';
import CreatorABI from 'archisinal/dist/artifacts/creator.json';

export class CreatorListener extends EventListenerImpl {
  constructor(address: string) {
    super(address, CreatorABI);
    console.log('🎉 Created CreatorListener');
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
