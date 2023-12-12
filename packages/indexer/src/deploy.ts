import { setupCollectionFabric } from '@archisinal/contracts/test/shared/test-setups/collection_fabric';
import { setupMarketplace } from '@archisinal/contracts/test/shared/test-setups/marketplace';
import { setupAccountManager } from '@archisinal/contracts/test/shared/test-setups/account_manager';
import { setupArchNFT } from '@archisinal/contracts/test/shared/test-setups/arch_nft';
import ApiSingleton from '@archisinal/contracts/test/shared/api_singleton';
import { Signers } from './signers';

export async function deploy() {
  const api = await ApiSingleton.getInstance();

  const defaultSigner = Signers.defaultSigner;

  const collectionFabric = await setupCollectionFabric();

  const marketplace = await setupMarketplace();

  const accountManager = await setupAccountManager();

  const archNFT = await setupArchNFT();

  console.log(`collectionFabric: ${collectionFabric.address}`);

  console.log(`marketplace: ${marketplace.address}`);

  console.log(`accountManager: ${accountManager.address}`);

  console.log(`archNFT: ${archNFT.address}`);

  return {
    collectionFabric,
    marketplace,
    accountManager,
    archNFT,
  };
}
