import { EventListenerImpl } from '../event-listener';
import { convertEvent } from '../event';
import EVENT_DATA_TYPE_DESCRIPTIONS from '@archisinal/contracts/typechain-generated/event-data/creator.json';
import chalk from 'chalk';
import * as ReturnTypes from '@archisinal/contracts/typechain-generated/event-types/creator';
import CreatorABI from '@archisinal/contracts/artifacts/creator.json';

export class CreatorListener extends EventListenerImpl {
  constructor(address: string) {
    super(address, CreatorABI);
    console.log(`🎉 Created CreatorListener <${address}>`);
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
