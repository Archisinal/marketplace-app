'use client';

import React, { useEffect } from 'react';
import { WalletContextProvider } from '@/features/wallet-connect/providers';
import { useRouter } from 'next/navigation';
import { ApiPromise, WsProvider } from '@polkadot/api';
import ApiSingleton from '@archisinal/contracts/dist/test/shared/api_singleton';

type TProps = {
  children: React.ReactNode;
};

export function WalletProvider({ children }: TProps) {
  return <WalletContextProvider>{children}</WalletContextProvider>;
}

export function NodeSocketProvider({ children }: TProps) {
  const connect = async () => {
    const wsProvider = new WsProvider(process.env.NEXT_PUBLIC_NODE_URL!);

    const api = await ApiPromise.create({
      provider: wsProvider,
    });

    await ApiSingleton.initWithApi(api);

    console.log('Connected to node: ' + process.env.NEXT_PUBLIC_NODE_URL);
  };

  const disconnect = async () => {
    await ApiSingleton.disconnect();
    console.log('Disconnected from node: ' + process.env.NEXT_PUBLIC_NODE_URL);
  };

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_NODE_URL) {
      console.error('Node wss:// URL is not set.');
      return;
    }

    connect();
    return () => {
      disconnect();
    };
  }, []);

  return <>{children}</>;
}

export function IndexerSocketProvider({ children }: TProps) {
  const router = useRouter();
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_INDEXER_WS_URL) {
      console.error('Indexer wss:// URL is not set.');
      return;
    }

    const ws = new WebSocket(process.env.NEXT_PUBLIC_INDEXER_WS_URL);

    ws.onopen = () => {
      console.log(
        'Connected to Indexer: ' + process.env.NEXT_PUBLIC_INDEXER_WS_URL,
      );
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.event === 'CollectionCreated') {
        router.refresh();
      }
    };

    ws.onclose = () => {
      console.log(
        'Disconnected from Indexer: ' + process.env.NEXT_PUBLIC_INDEXER_WS_URL,
      );
    };

    return () => {
      ws.close();
    };
  }, []);
  return <>{children}</>;
}
