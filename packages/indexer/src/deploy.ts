import { setupCollectionFabric } from '@archisinal/contracts/dist/test/shared/test-setups/collection_fabric';
import { setupMarketplace } from '@archisinal/contracts/dist/test/shared/test-setups/marketplace';
import { setupAccountManager } from '@archisinal/contracts/dist/test/shared/test-setups/account_manager';
import { updateEnvFile } from './utils';
import { ApiPromise, WsProvider } from '@polkadot/api';
import ApiSingleton from '@archisinal/contracts/dist/test/shared/api_singleton';

export async function deploy() {
  const wsProvider = new WsProvider(process.env.RPC_URL!);

  const api = await ApiPromise.create({
    provider: wsProvider,
  });

  await ApiSingleton.initWithApi(api);

  const collectionFabric = await setupCollectionFabric();

  const marketplace = await setupMarketplace();

  const accountManager = await setupAccountManager();

  console.log(`collectionFabric: ${collectionFabric.address}`);
  console.log(`marketplace: ${marketplace.address}`);
  console.log(`accountManager: ${accountManager.address}`);

  updateEnvFile('COLLECTION_FABRIC_ADDRESS', collectionFabric.address);
  updateEnvFile('MARKETPLACE_ADDRESS', marketplace.address);
  updateEnvFile('ACCOUNT_MANAGER_ADDRESS', accountManager.address);

  return {
    collectionFabric,
    marketplace,
    accountManager,
  };
}
