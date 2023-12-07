import { Signers } from '../signers';
import ApiSingleton from 'archisinal/dist/test/shared/api_singleton';
import CollectionFabricContract from 'archisinal/dist/typechain-generated/contracts/collection_fabric';
import MarketplaceContract from 'archisinal/dist/typechain-generated/contracts/marketplace';
import AccountManagerContract from 'archisinal/dist/typechain-generated/contracts/account_manager';
import { Config } from '../env';

export async function getContracts(): Promise<GetContractsResult> {
  const api = await ApiSingleton.getInstance();

  const defaultSigner = Signers.defaultSigner;

  const collectionFabric = new CollectionFabricContract(
    Config.collectionFabricAddress,
    defaultSigner,
    api,
  );

  const marketplace = new MarketplaceContract(
    Config.marketplaceAddress,
    defaultSigner,
    api,
  );

  const accountManager = new AccountManagerContract(
    Config.accountManagerAddress,
    defaultSigner,
    api,
  );

  return {
    collectionFabric,
    marketplace,
    accountManager,
  };
}

export interface GetContractsResult {
  collectionFabric: CollectionFabricContract;
  marketplace: MarketplaceContract;
  accountManager: AccountManagerContract;
}
