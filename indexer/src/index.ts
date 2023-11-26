import { PolkadotIndexer } from './indexer';
import { ArchNftListener } from './events/contracts/arch-nft';
import { UserListener } from './events/contracts/user';
import { CreatorListener } from './events/contracts/creator';
import { MarketplaceListener } from './events/contracts/marketplace';
import { AccountManagerListener } from './events/contracts/account-manager';
import { EventListeners } from './events';

const main = async () => {
  const indexer = new PolkadotIndexer();
  await indexer.init();

  EventListeners.addListeners(
    new ArchNftListener('5HcWLmJifVTs6kvCtxZYfZZn11cb9uDn4LFc1NFydrGrPEUf'),
    new UserListener('5GesXdqd2ELFHJY8q5mAqk6fvFhH38T1tUTi7GX7z4HLRvAd'),
    new CreatorListener('5DFLhtsdt92VtqfgVHFD19zoyqWqPWNvPMqZgcbb9Lyhnabr'),
    new MarketplaceListener('5H7LNHfWseUYQZSwY65eTwbKrHSgC7y5FB6jrqQ1kiArfNTj'),
    new AccountManagerListener(
      '5CUHjCZNK5YhXqjdsDWNg19q8rtDqj98qAJfXDLZQ6DfUxf1',
    ),
  );

  await indexer.processChain();
};

main().catch(console.error);
