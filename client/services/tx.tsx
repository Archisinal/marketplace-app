import { Signer } from '@polkadot/types/types';
import ArchNFTAbi from 'archisinal/dist/artifacts/arch_nft.json';
import CollectionFabricContract from 'archisinal/dist/typechain-generated/contracts/collection_fabric';
import ApiSingleton from 'archisinal/dist/test/shared/api_singleton';
import { CollectionInfo } from 'archisinal/dist/typechain-generated/types-arguments/collection_fabric';
import { SignAndSendSuccessResponse } from '@727-ventures/typechain-types/src/tx';

export const instantiateCollection = async (
  signerAddress: string,
  signer: Signer,
  name: string,
  uri: string,
  categories: string[],
  royalty: number,
): Promise<SignAndSendSuccessResponse> => {
  const api = await ApiSingleton.getInstance();
  await api.isReady;

  const CODE_HASH = ArchNFTAbi.source.hash;
  const contract = new CollectionFabricContract(
    '5GcSABmXtBCeLNZGdY95Kq5m1aMyHiAqS1NPRBacuZNoWV8a',
    { address: signerAddress, signer },
    api,
  );

  const args: [CollectionInfo, string] = [
    {
      name,
      uri,
      additionalInfo: JSON.stringify({
        tags: categories,
      }),
      royalty,
    } as CollectionInfo,
    CODE_HASH,
  ];

  return await contract.tx.instantiateCollection(...args);
};
