import { setupCollectionFabric } from 'archisinal/dist/test/shared/test-setups/collection_fabric';
import { setupMarketplace } from 'archisinal/dist/test/shared/test-setups/marketplace';
import { setupAccountManager } from 'archisinal/dist/test/shared/test-setups/account_manager';
import ApiSingleton from 'archisinal/dist/test/shared/api_singleton';
import { Signers } from './signers';

export async function deploy() {
  const api = await ApiSingleton.getInstance();

  const defaultSigner = Signers.defaultSigner;

  const collectionFabric = await setupCollectionFabric();

  const marketplace = await setupMarketplace();

  const accountManager = await setupAccountManager();

  console.log(`collectionFabric: ${collectionFabric.address}`);

  console.log(`marketplace: ${marketplace.address}`);

  console.log(`accountManager: ${accountManager.address}`);

  return {
    collectionFabric,
    marketplace,
    accountManager,
  };
}
