const { ApiPromise, WsProvider } = require('@polkadot/api');
export const fromBytesToString = (bytes: number[]): string => {
  return Buffer.from(bytes).toString();
};

export async function getBlockTimestamp(hash: string): Promise<string> {
  const provider = new WsProvider('wss://rpc.polkadot.io');
  const api = await ApiPromise.create({ provider });

  const signedBlock = await api.rpc.chain.getBlock(hash);

  for (const {
    method: { method, section },
    args,
  } of signedBlock.block.extrinsics) {
    if (section == 'timestamp' && method == 'set') {
      await provider.disconnect();
      await api.disconnect();

      return args[0].toString();
    }
  }

  return '';
}
