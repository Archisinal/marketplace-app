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
      '5DJ9YKkVHife8bgP7ssuPhHMNJvnLrAfjSWZp5Hgwt6128E3',
    ),
    new MarketplaceListener('5H3vCPYJL1HueBNA5W7NaFd7y5Ag7n2HUfsP2jJPDz7KgBGc'),
    new AccountManagerListener(
      '5Giy4KMv3321yhpugfNeZVR8qihpVkPTi5Ln56xYQpsmh8hg',
    ),
  );

  await indexer.processChain();
};

main().catch(console.error);
