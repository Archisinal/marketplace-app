import { Wallet, WalletAccount } from '@subwallet/wallet-connect/src/types';
import { EvmWallet } from '@/features/wallet-connect/types';
import React from 'react';

export interface WalletContextInterface {
  wallet?: Wallet;
  evmWallet?: EvmWallet;
  accounts: WalletAccount[];
  setWallet: (
    wallet: Wallet | EvmWallet | undefined,
    walletType: 'substrate' | 'evm',
  ) => void;
  walletType: 'substrate' | 'evm';
  selectAccount: (value: string) => void;
  selectedAccount: WalletAccount[] | null;
}

export const WalletContext = React.createContext<WalletContextInterface>({
  accounts: [],
  setWallet: (wallet, walletType: 'substrate' | 'evm') => {},
  walletType: 'substrate',
  selectedAccount: null,
  selectAccount: (v: string) => {},
});

interface OpenSelectWalletInterface {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const OpenSelectWallet = React.createContext<OpenSelectWalletInterface>({
  isOpen: false,
  open: () => {},
  close: () => {},
});
