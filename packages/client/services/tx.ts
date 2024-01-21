import { Signer } from '@polkadot/types/types';
import ArchNFTAbi from '@archisinal/contracts/dist/artifacts/arch_nft.json';
import CollectionFabricContract from '@archisinal/contracts/dist/typechain-generated/contracts/collection_fabric';
import MarketplaceContract from '@archisinal/contracts/dist/typechain-generated/contracts/marketplace';
import ArchNFTContract from '@archisinal/contracts/dist/typechain-generated/contracts/arch_nft';
import ApiSingleton from '@archisinal/contracts/dist/test/shared/api_singleton';
import { CollectionInfo } from '@archisinal/contracts/dist/typechain-generated/types-arguments/collection_fabric';
import { SignAndSendSuccessResponse } from '@archisinal/typechain-types';
import { IdBuilder } from '@archisinal/contracts/dist/typechain-generated/types-arguments/arch_nft';
import { NftMetadata } from '@archisinal/contracts/dist/typechain-generated/types-arguments/arch_nft';
import BN from 'bn.js';
import { NFT } from '@archisinal/backend';
import toast from 'react-hot-toast';
import {
  Currency,
  CurrencyBuilder,
  Id,
} from '@archisinal/contracts/dist/typechain-generated/types-arguments/marketplace';

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
      royalty: royalty * 100,
    } as CollectionInfo,
    CODE_HASH,
  ];

  toast.loading('Creating collection.');

  return contract.tx.instantiateCollection(...args);
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
}): Promise<SignAndSendSuccessResponse> => {
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

  toast.loading('Minting NFT');

  return archNFTContract.tx.mintWithMetadata(mintTo, idU128, metadata);
};

export const listNft = async ({
  price,
  signerAddress,
  signer,
  nft,
}: {
  price: BN;
  signer: Signer;
  signerAddress: string;
  nft: NFT;
}) => {
  const api = await ApiSingleton.getInstance();
  await api.isReady;

  const tokenId = IdBuilder.U128(nft.id_in_collection);

  const archNFTContract = new ArchNFTContract(
    nft.collection?.address!,
    { address: signerAddress, signer },
    api,
  );

  const marketplaceContract = new MarketplaceContract(
    process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS!,
    { address: signerAddress, signer },
    api,
  );

  toast.loading('Approving NFT for sale');

  await archNFTContract.tx.approve(marketplaceContract.address, tokenId, true);

  toast.loading('Listing NFT for sale');

  const argsListNFT: [string, string, Id, BN, Currency] = [
    signerAddress,
    nft.collection?.address!,
    tokenId,
    price,
    CurrencyBuilder.Native(),
  ];

  return await marketplaceContract.tx.listNftForSale(...argsListNFT);
};

export const cancelListing = async ({
  listingId,
  signer,
  signerAddress,
}: {
  listingId: string;
  signer: Signer;
  signerAddress: string;
}) => {
  const api = await ApiSingleton.getInstance();
  await api.isReady;

  const marketplaceContract = new MarketplaceContract(
    process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS!,
    { address: signerAddress, signer },
    api,
  );

  toast.loading('Canceling listing');

  return await marketplaceContract.tx.cancelListing(listingId);
};

export const buyNft = async ({
  listingId,
  signer,
  signerAddress,
  price,
}: {
  listingId: string;
  signer: Signer;
  signerAddress: string;
  price: string;
}) => {
  const api = await ApiSingleton.getInstance();
  await api.isReady;

  const marketplaceContract = new MarketplaceContract(
    process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS!,
    { address: signerAddress, signer },
    api,
  );

  toast.loading('Buying NFT');

  return await marketplaceContract.tx.buyNft(listingId, {
    value: price,
  });
};
