'use client';

import React, { useEffect } from 'react';
import { WalletContextProvider } from '@/features/wallet-connect/providers';
import { useRouter } from 'next/navigation';
import { ApiPromise, WsProvider } from '@polkadot/api';
import ApiSingleton from '@archisinal/contracts/dist/test/shared/api_singleton';
import { WalletContextInterface } from '@/features/wallet-connect/context';

type TProps = {
  children: React.ReactNode;
};

export interface NodeContextInterface {
  nativeCurrency: string;
  subscanUrl: string;
  api: ApiPromise | null;
}

export function WalletProvider({ children }: TProps) {
  return <WalletContextProvider>{children}</WalletContextProvider>;
}

export const NodeContext = React.createContext<NodeContextInterface>({
  nativeCurrency: '',
  subscanUrl: '',
  api: null,
});

export function NodeSocketProvider({ children }: TProps) {
  const [api, setApi] = React.useState<ApiPromise | null>(null);
  const [nativeCurrency, setNativeCurrency] = React.useState<string>('');
  const [subscanUrl, setSubscanUrl] = React.useState<string>('');
  const connect = async () => {
    const wsProvider = new WsProvider(process.env.NEXT_PUBLIC_RPC_URL!);

    const api = await ApiPromise.create({
      provider: wsProvider,
    });

    await ApiSingleton.initWithApi(api);

    setApi(api);
    setNativeCurrency(api.registry.chainTokens[0]);
    if (api.registry.chainTokens[0] === 'SHY') {
      setSubscanUrl('https://shibuya.subscan.io/');
    } else if (api.registry.chainTokens[0] === 'ASTR') {
      setSubscanUrl('https://astar.subscan.io/');
    } else {
      setSubscanUrl('https://subscan.io/');
    }

    console.log('Connected to node: ' + process.env.NEXT_PUBLIC_RPC_URL);
  };

  const disconnect = async () => {
    await ApiSingleton.disconnect();
    console.log('Disconnected from node: ' + process.env.NEXT_PUBLIC_RPC_URL);
  };

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_RPC_URL) {
      console.error('Node wss:// URL is not set.');
      return;
    }

    connect();
    return () => {
      disconnect();
    };
  }, []);

  return (
    <NodeContext.Provider value={{ nativeCurrency, subscanUrl, api }}>
      {children}
    </NodeContext.Provider>
  );
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

      console.log('Received message from Indexer: ', message);
      router.refresh();
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
