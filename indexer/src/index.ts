import { PolkadotIndexer } from './indexer';
import { ArchNftListener } from './events/contracts/arch-nft';
import { UserListener } from './events/contracts/user';
import { CreatorListener } from './events/contracts/creator';
import { MarketplaceListener } from './events/contracts/marketplace';
import { AccountManagerListener } from './events/contracts/account-manager';
import { EventListeners } from './events';
import { CollectionFabricListener } from './events/contracts/collection_fabric';

const main = async () => {
  const indexer = new PolkadotIndexer();
  await indexer.init();

  EventListeners.addListeners(
    new CollectionFabricListener(
      '5F8jAt6whfoAAX1BaewnyFe2qWPG2755VD4anQs9jUcBchaT',
    ),
    new MarketplaceListener('5FmuVrXRm3SZ5prFjmeRLeGtBa7VZxvQ9ofrVahfucQ61bK6'),
    new AccountManagerListener(
      '5GPb4bqw7vwHzi1for6rCqLsJoKSnnU8V3YoTRwufao7DCHY',
    ),
    new ArchNftListener('5HP7GNJVenv8QwLJvFuqNtA8YFnrQsTm24vZ4LJQLomZ3z3p'),
  );

  await indexer.processChain();
};

main().catch(console.error);
