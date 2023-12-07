import { getContracts } from './utils';
import ArchNFTAbi from 'archisinal/dist/artifacts/arch_nft.json';
import { CollectionInfo } from 'archisinal/dist/typechain-generated/types-arguments/collection_fabric';
import ArchNFTContract from 'archisinal/dist/typechain-generated/contracts/arch_nft';
import {
  Id,
  IdBuilder,
} from 'archisinal/dist/typechain-generated/types-arguments/arch_nft';
import {
  Currency,
  CurrencyBuilder,
} from 'archisinal/dist/typechain-generated/types-arguments/marketplace';
import { Signers } from '../signers';
import ApiSingleton from 'archisinal/dist/test/shared/api_singleton';

const CODE_HASH = ArchNFTAbi.source.hash;

export async function mintListScenario() {
  const { collectionFabric, marketplace, accountManager } =
    await getContracts();

  const api = await ApiSingleton.getInstance();
  const signer = Signers.defaultSigner;

  // 1. Create collection via collection fabric

  console.log('1. Create collection via collection fabric');

  const args: [CollectionInfo, string] = [
    {
      name: 'Crypto Punks',
      uri: 'ipfs://crypto-punks/',
      additionalInfo: JSON.stringify({
        tags: ['punks', 'legacy', 'top-charts'],
      }),
      royalty: 100,
    } as CollectionInfo,
    CODE_HASH,
  ];

  const [_, address] = (
    await collectionFabric.query.instantiateCollection(...args)
  ).value
    .unwrap()
    .unwrap();

  await collectionFabric.tx.instantiateCollection(...args);

  // 2. Connect to the created collection

  console.log('2. Connect to the created collection');

  const collection = new ArchNFTContract(address.toString(), signer, api);

  // 3.1. Get token id

  console.log('3.1. Get token id');

  const tokenCount = (await collection.query.totalSupply()).value
    .unwrap()
    .toNumber();

  const id = IdBuilder.U8(tokenCount);

  // 3.2. Mint token in the collection

  console.log('3.2. Mint token in the collection');

  await collection.tx.mint(signer.address, id);

  // 4. Approve marketplace to use this token
  console.log('4. Approve marketplace to use this token');

  await collection.tx.approve(marketplace.address, id, true);

  // 5. Create a listing in marketplace
  console.log('5. Create a listing in marketplace');

  const argsListNFT: [string, string, Id, number, Currency] = [
    signer.address,
    collection.address,
    id,
    10,
    CurrencyBuilder.Native(),
  ];

  const listingId = (
    await marketplace.query.listNftForSale(...argsListNFT)
  ).value
    .unwrap()
    .unwrap()
    .toString();

  await marketplace.tx.listNftForSale(...argsListNFT);
  console.log('Created listing with listing id: ', listingId);

  // 6. Cancel listing
  console.log('6. Cancel listing');

  await marketplace.tx.cancelListing(listingId);

  // 7. Disconnect
  console.log('7. Disconnect');

  await api.disconnect();

  process.exit(0);
}

mintListScenario().catch(console.error);
