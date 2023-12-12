import { Id } from '@archisinal/contracts/dist/typechain-generated/types-returns/arch_nft';
import ApiSingleton from '@archisinal/contracts/dist/test/shared/api_singleton';
export const fromBytesToString = (bytes: number[]): string => {
  return Buffer.from(bytes).toString();
};

export async function getBlockTimestamp(hash: string): Promise<string> {
  const api = await ApiSingleton.getInstance();

  const signedBlock = await api.rpc.chain.getBlock(hash);

  for (const {
    method: { method, section },
    args,
  } of signedBlock.block.extrinsics) {
    if (section == 'timestamp' && method == 'set') {
      return args[0].toString();
    }
  }

  return '';
}

export function idToString(id: Id): string {
  const keys: Array<keyof Id> = ['u8', 'u16', 'u32', 'u64', 'u128', 'bytes'];
  for (const key of keys) {
    if (id[key] !== undefined) {
      if (key === 'bytes') {
        const uint8Array = new Uint8Array(id.bytes!);
        const decoder = new TextDecoder(); // Default is 'utf-8'
        return decoder.decode(uint8Array);
      } else {
        return id[key]!.toString();
      }
    }
  }
  throw new Error('Invalid id');
}
