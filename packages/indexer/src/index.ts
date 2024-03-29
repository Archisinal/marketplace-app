import { PolkadotIndexer } from './indexer';
import { MarketplaceListener } from './events/contracts/marketplace';
import { AccountManagerListener } from './events/contracts/account-manager';
import { EventListeners } from './events';
import { CollectionFabricListener } from './events/contracts/collection_fabric';
import { Config } from './env';
import WebSocket, { WebSocketServer } from 'ws';
import chalk from 'chalk';
import prisma from '@archisinal/db';
import { ArchNftListener } from './events/contracts/arch-nft';

const wss = new WebSocketServer({ port: 3020 });

wss.on('connection', function connection(ws) {
  console.log(chalk.green('\nA new WS client Connected!'));
});

export function broadcastChange(data: any) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

const main = async () => {
  const args = require('args-parser')(process.argv);
  const indexer = new PolkadotIndexer();

  try {
    const provider = Config.rpcUrl;
    await indexer.init(provider);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }

  EventListeners.addListeners(
    new CollectionFabricListener(Config.collectionFabricAddress),
    new MarketplaceListener(Config.marketplaceAddress),
    new AccountManagerListener(Config.accountManagerAddress),
  );

  const collections = await prisma.collections.findMany();
  collections.forEach(({ collection }) => {
    EventListeners.addListeners(new ArchNftListener(collection));
  });

  await indexer.processChain(args['first-block'], args['forced-block']);
};

main().catch(console.error);
