import { PolkadotIndexer } from './indexer';
import { MarketplaceListener } from './events/contracts/marketplace';
import { AccountManagerListener } from './events/contracts/account-manager';
import { EventListeners } from './events';
import { CollectionFabricListener } from './events/contracts/collection_fabric';
import { Config } from './env';

const main = async () => {
  const indexer = new PolkadotIndexer();
  await indexer.init();

  EventListeners.addListeners(
    new CollectionFabricListener(Config.collectionFabricAddress),
    new MarketplaceListener(Config.marketplaceAddress),
    new AccountManagerListener(Config.accountManagerAddress),
  );

  await indexer.processChain();
};

main().catch(console.error);
