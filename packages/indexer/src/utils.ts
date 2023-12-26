import { Id } from '@archisinal/contracts/dist/typechain-generated/types-returns/arch_nft';
import ApiSingleton from '@archisinal/contracts/dist/test/shared/api_singleton';
import * as fs from 'fs';
export const fromBytesToString = (bytes: number[]): string => {
  return Buffer.from(bytes).toString();
};

export async function getBlockTimestamp(hash: string): Promise<number> {
  const api = await ApiSingleton.getInstance();

  const signedBlock = await api.rpc.chain.getBlock(hash);

  for (const {
    method: { method, section },
    args,
  } of signedBlock.block.extrinsics) {
    if (section == 'timestamp' && method == 'set') {
      return parseInt(args[0].toString());
    }
  }

  return -1;
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

export function updateEnvFile(key: string, value: string) {
  const envPath = '.env';
  let envContent = fs.readFileSync(envPath, { encoding: 'utf-8' });
  let hasKey = false;

  const lines = envContent.split('\n').map((line) => {
    if (line.startsWith(key)) {
      hasKey = true;
      return `${key}=${value}`;
    }
    return line;
  });

  if (!hasKey) {
    lines.push(`${key}=${value}`);
  }

  fs.writeFileSync(envPath, lines.join('\n'));
}
