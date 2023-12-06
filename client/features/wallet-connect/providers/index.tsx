// Copyright 2019-2022 @subwallet/wallet-connect authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useLocalStorage } from '@/features/wallet-connect/hooks/useLocalStorage';
import { getWalletBySource } from '@/features/wallet-connect/wallets/dotsama/wallets';
import { getEvmWalletBySource } from '@/features/wallet-connect/wallets/evm/evmWallets';
import {
  EvmWallet,
  Wallet,
  WalletAccount,
} from '@/features/wallet-connect/types';
import React, { useCallback, useEffect, useState } from 'react';

import {
  OpenSelectWallet,
  WalletContext,
  WalletContextInterface,
} from '@/features/wallet-connect/context';

interface Props {
  children: React.ReactElement;
}

export function WalletContextProvider({ children }: Props) {
  const [walletKey, setWalletKey] = useLocalStorage('wallet-key');
  const [walletType, setWalletType] = useLocalStorage(
    'wallet-type',
    'substrate',
  );
  const [currentWallet, setCurrentWallet] = useState<Wallet | undefined>(
    getWalletBySource(walletKey),
  );

  const [isSelectWallet, setIsSelectWallet] = useState(false);
  const [accounts, setAccounts] = useState<WalletAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<
    WalletAccount[] | null
  >(null);

  const afterSelectWallet = useCallback(async (wallet: Wallet) => {
    const infos = await wallet.getAccounts();

    infos && setAccounts(infos);
  }, []);

  useEffect(() => {
    setCurrentWallet(getWalletBySource(walletKey));
  }, [walletKey]);

  const selectWallet = useCallback(
    async (wallet: Wallet) => {
      setCurrentWallet(currentWallet);

      await wallet.enable();
      setWalletKey(wallet.extensionName);

      await afterSelectWallet(wallet);
    },
    [afterSelectWallet, currentWallet, setWalletKey],
  );

  const selectAccount = useCallback(
    async (value: string) => {
      if (!value) {
        setSelectedAccount(null);
        return;
      }
      const accounts = await currentWallet?.getAccounts();
      const selectedAccount = accounts?.filter((acc) => acc.address === value);
      if (selectedAccount?.length) {
        setSelectedAccount(selectedAccount);
      }
    },
    [currentWallet, walletKey],
  );

  //TODO: case disconnect currrent wallet
  const disconnectWallet = () => {
    setCurrentWallet(undefined);
    setWalletKey('wallet-key');
    setAccounts([]);
  };

  const afterSelectEvmWallet = useCallback(async (wallet: EvmWallet) => {
    await wallet?.enable(); // Quick call extension?.request({ method: 'eth_requestAccounts' });
  }, []);

  const selectEvmWallet = useCallback(
    async (wallet: EvmWallet) => {
      await afterSelectEvmWallet(wallet);

      setCurrentWallet(currentWallet);

      setWalletKey(wallet.extensionName);

      window.location.reload();
    },
    [afterSelectEvmWallet, currentWallet, setWalletKey],
  );

  const walletContext = {
    wallet: getWalletBySource(walletKey),
    evmWallet: getEvmWalletBySource(walletKey),
    accounts,
    setWallet: (
      wallet: Wallet | EvmWallet | undefined,
      walletType: 'substrate' | 'evm',
    ) => {
      if (walletType === 'substrate') {
        wallet && selectWallet(wallet as Wallet);
      } else {
        wallet && selectEvmWallet(wallet as EvmWallet);
      }

      wallet && setWalletType(walletType);
    },
    walletType,
    selectAccount,
    selectedAccount,
    disconnectWallet,
  };

  const selectWalletContext = {
    isOpen: isSelectWallet,
    open: () => {
      setIsSelectWallet(true);
    },
    close: () => {
      setIsSelectWallet(false);
    },
  };

  useEffect(() => {
    if (walletType === 'substrate') {
      const wallet = getWalletBySource(walletKey);

      setTimeout(() => {
        if (wallet && wallet?.installed) {
          // eslint-disable-next-line no-void
          void afterSelectWallet(wallet);
        }
      }, 150);
    } else {
      const evmWallet = getEvmWalletBySource(walletKey);

      evmWallet &&
        evmWallet?.isReady.then(() => {
          afterSelectEvmWallet(evmWallet).catch(console.error);
        });
    }
  }, [afterSelectEvmWallet, afterSelectWallet, walletKey, walletType]);

  return (
    <WalletContext.Provider value={walletContext as WalletContextInterface}>
      <OpenSelectWallet.Provider value={selectWalletContext}>
        {children}
      </OpenSelectWallet.Provider>
    </WalletContext.Provider>
  );
}
