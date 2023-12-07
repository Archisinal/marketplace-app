'use client';
import React from 'react';
import { WalletContextProvider } from '@/features/wallet-connect/providers';

type TProps = {
  children: React.JSX.Element;
};
export function WalletProvider({ children }: TProps) {
  return <WalletContextProvider>{children}</WalletContextProvider>;
}
