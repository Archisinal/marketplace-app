import { Signer } from '@polkadot/types/types';
import ArchNFTAbi from '@archisinal/contracts/dist/artifacts/arch_nft.json';
import CollectionFabricContract from '@archisinal/contracts/dist/typechain-generated/contracts/collection_fabric';
import ApiSingleton from '@archisinal/contracts/dist/test/shared/api_singleton';
import { CollectionInfo } from '@archisinal/contracts/dist/typechain-generated/types-arguments/collection_fabric';
import { SignAndSendSuccessResponse } from '@archisinal/typechain-types';

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
    '5Cp5iUpwwMA1ZppJ98ZFfS7XDVnfteq5RtbprAEnxgkgbjRG',
    { address: signerAddress, signer },
    api,
  );

  const args: [CollectionInfo, string] = [
    {
      name,
      uri,
      additionalInfo: JSON.stringify('description'),
      royalty,
    } as CollectionInfo,
    CODE_HASH,
  ];

  return await contract.tx.instantiateCollection(...args);
};
