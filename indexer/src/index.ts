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
      '5G4UvbwPPBeBT1vAUpENcdFmHFmg2fi8nY25S1bcxyArEvZz',
    ),
    new MarketplaceListener('5Dr2YsR5gbm7z6YT7Yj4SeQVoytUP9n7EbFW4NTLxGHKhn9n'),
    new AccountManagerListener(
      '5Fq8NJUUQXEh1zanPFu97EnRTNGQX61fPF1iWPgZYtcc13Gt',
    ),
  );

  await indexer.processChain();
};

main().catch(console.error);
