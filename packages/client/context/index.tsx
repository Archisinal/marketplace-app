'use client';

import React, { useEffect } from 'react';
import { WalletContextProvider } from '@/features/wallet-connect/providers';
import { useRouter } from 'next/navigation';

type TProps = {
  children: React.ReactNode;
};

export function WalletProvider({ children }: TProps) {
  return <WalletContextProvider>{children}</WalletContextProvider>;
}

export function IndexerSocketProvider({ children }: TProps) {
  const router = useRouter();
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_INDEXER_WS_URL) return;

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
