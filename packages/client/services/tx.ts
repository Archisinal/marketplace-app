import { Signer } from '@polkadot/types/types';
import ArchNFTAbi from '@archisinal/contracts/dist/artifacts/arch_nft.json';
import CollectionFabricContract from '@archisinal/contracts/dist/typechain-generated/contracts/collection_fabric';
import ArchNFTContract from '@archisinal/contracts/dist/typechain-generated/contracts/arch_nft';
import ApiSingleton from '@archisinal/contracts/dist/test/shared/api_singleton';
import { CollectionInfo } from '@archisinal/contracts/dist/typechain-generated/types-arguments/collection_fabric';
import { SignAndSendSuccessResponse } from '@archisinal/typechain-types';
import { IdBuilder } from '@archisinal/contracts/dist/typechain-generated/types-arguments/arch_nft';
import { NftMetadata } from '@archisinal/contracts/dist/typechain-generated/types-arguments/arch_nft';
import BN from 'bn.js';

export const instantiateCollection = async (
  signerAddress: string,
  signer: Signer,
  name: string,
  description: string,
  uri: string,
  royalty: number,
): Promise<SignAndSendSuccessResponse> => {
  const api = await ApiSingleton.getInstance();
  await api.isReady;

  const CODE_HASH = ArchNFTAbi.source.hash;
  const contract = new CollectionFabricContract(
    process.env.NEXT_PUBLIC_COLLECTION_FABRIC_ADDRESS!,
    { address: signerAddress, signer },
    api,
  );

  const args: [CollectionInfo, string] = [
    {
      name,
      uri,
      additionalInfo: description,
      royalty,
    } as CollectionInfo,
    CODE_HASH,
  ];

  return await contract.tx.instantiateCollection(...args);
};

export type MintNFTReturn = {
  mintRecipe: SignAndSendSuccessResponse;
  updateMetadataRecipe: SignAndSendSuccessResponse;
};

export const mintNft = async ({
  signerAddress,
  signer,
  collectionAddress,
  mintTo,
  categories,
  name,
  description,
  image,
  externalUrl,
}: {
  signerAddress: string;
  signer: Signer;
  collectionAddress: string;
  mintTo: string;
  categories: Array<string>;
  name: string;
  description: string;
  image: string;
  externalUrl: string;
}): Promise<MintNFTReturn> => {
  const api = await ApiSingleton.getInstance();
  await api.isReady;

  const archNFTContract = new ArchNFTContract(
    collectionAddress,
    { address: signerAddress, signer },
    api,
  );

  const metadata: NftMetadata = {
    name,
    description,
    image,
    externalUrl,
    categories,
  };

  const tokenCount = (await archNFTContract.query.totalSupply()).value
    .unwrap()
    .toNumber();

  const idU128 = IdBuilder.U128(new BN(tokenCount));

  console.log('mintTo', mintTo);
  console.log('idU128', idU128);

  const mintRecipe = await archNFTContract.tx.mint(mintTo, idU128);
  const updateMetadataRecipe = await archNFTContract.tx.updateNftMetadata(
    idU128,
    metadata,
  );

  return {
    mintRecipe,
    updateMetadataRecipe,
  };
};
