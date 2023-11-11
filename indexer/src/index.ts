import { PolkadotIndexer } from './indexer';
import { ArchNftListener } from './events/contracts/arch-nft';
import { UserListener } from './events/contracts/user';
import { CreatorListener } from './events/contracts/creator';
import { MarketplaceListener } from './events/contracts/marketplace';
import { AccountManagerListener } from './events/contracts/account-manager';

import ArchNFTAbi from 'archisinal/dist/artifacts/arch_nft.json';
import UserAbi from 'archisinal/dist/artifacts/user.json';
import CreatorAbi from 'archisinal/dist/artifacts/creator.json';
import MarketplaceAbi from 'archisinal/dist/artifacts/marketplace.json';
import AccountManagerAbi from 'archisinal/dist/artifacts/account_manager.json';

const main = async () => {
  const indexer = new PolkadotIndexer();
  await indexer.init();

  // PSP22 deployed at 5Eh87pJ5GXLX4kmWp1LDYnq1J5WhUSigpfrprr3iCeHdM5vq
  // ArchNFT deployed at 5HcWLmJifVTs6kvCtxZYfZZn11cb9uDn4LFc1NFydrGrPEUf
  // User deployed at 5GesXdqd2ELFHJY8q5mAqk6fvFhH38T1tUTi7GX7z4HLRvAd
  // Creator deployed at 5DFLhtsdt92VtqfgVHFD19zoyqWqPWNvPMqZgcbb9Lyhnabr
  // Marketplace deployed at 5H7LNHfWseUYQZSwY65eTwbKrHSgC7y5FB6jrqQ1kiArfNTj
  // AccountManager deployed at 5CUHjCZNK5YhXqjdsDWNg19q8rtDqj98qAJfXDLZQ6DfUxf1

  indexer.addEventHandlers(
    new ArchNftListener(
      '5HcWLmJifVTs6kvCtxZYfZZn11cb9uDn4LFc1NFydrGrPEUf',
      ArchNFTAbi,
    ),
    new UserListener(
      '5GesXdqd2ELFHJY8q5mAqk6fvFhH38T1tUTi7GX7z4HLRvAd',
      UserAbi,
    ),
    new CreatorListener(
      '5DFLhtsdt92VtqfgVHFD19zoyqWqPWNvPMqZgcbb9Lyhnabr',
      CreatorAbi,
    ),
    new MarketplaceListener(
      '5H7LNHfWseUYQZSwY65eTwbKrHSgC7y5FB6jrqQ1kiArfNTj',
      MarketplaceAbi,
    ),
    new AccountManagerListener(
      '5CUHjCZNK5YhXqjdsDWNg19q8rtDqj98qAJfXDLZQ6DfUxf1',
      AccountManagerAbi,
    ),
  );

  await indexer.processChain();
};

main().catch(console.error);
