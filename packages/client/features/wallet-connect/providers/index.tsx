// Copyright 2019-2022 @subwallet/wallet-connect authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useLocalStorage } from '@/features/wallet-connect/hooks/useLocalStorage';
import { getWalletBySource } from '@/features/wallet-connect/wallets/dotsama/wallets';
import { Wallet, WalletAccount } from '@/features/wallet-connect/types';
import React, { useCallback, useState } from 'react';

import {
  OpenSelectWallet,
  WalletContext,
  WalletContextInterface,
} from '@/features/wallet-connect/context';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

export function WalletContextProvider({ children }: Props) {
  const router = useRouter();
  const [walletKey, setWalletKey] = useLocalStorage(
    'wallet-key',
    undefined,
    async (walletKey) => {
      console.log('Loading wallet from local storage', walletKey);

      const wallet = await selectWallet(getWalletBySource(walletKey)!);
      const accountKey = localStorage.getItem('acc-key');
      if (accountKey) {
        console.log('Loading account from local storage', accountKey);
        const account = JSON.parse(accountKey as string);
        const accounts = await wallet?.getAccounts();
        const selectedAccount = accounts?.filter(
          (acc) => acc.address === account,
        );
        if (selectedAccount?.length) {
          setSelectedAccount(selectedAccount);
          setAccountKey(selectedAccount[0]?.address);
          await axios.post('/api/auth', {
            accountKey: selectedAccount[0]?.address,
          });
          router.refresh();
        }
      }
    },
  );
  const [walletType, setWalletType] = useLocalStorage(
    'wallet-type',
    'substrate',
  );
  const [currentWallet, setCurrentWallet] = useState<Wallet | undefined>();
  const [accountKey, setAccountKey] = useLocalStorage('acc-key', undefined);

  const [isSelectWallet, setIsSelectWallet] = useState(false);
  const [accounts, setAccounts] = useState<WalletAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<
    WalletAccount[] | null
  >(null);

  const afterSelectWallet = useCallback(async (wallet: Wallet) => {
    const infos = await wallet.getAccounts();

    infos && setAccounts(infos);
  }, []);

  const selectWallet = useCallback(
    async (wallet: Wallet) => {
      setCurrentWallet(wallet);

      await wallet.enable();
      setWalletKey(wallet.extensionName);

      await afterSelectWallet(wallet);

      return wallet;
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
        setAccountKey(selectedAccount[0]?.address);
        await axios.post('/api/auth', {
          accountKey: selectedAccount[0]?.address,
        });
        router.refresh();
      }
    },
    [currentWallet, walletKey],
  );

  //TODO: case disconnect current wallet
  const disconnectWallet = () => {
    setCurrentWallet(undefined);
    setWalletKey('wallet-key');
    setAccounts([]);
  };

  const setWallet = (
    wallet: Wallet | undefined,
    walletType: 'substrate' | 'evm',
  ) => {
    if (walletType === 'substrate') {
      wallet && selectWallet(wallet as Wallet);
    } else {
      console.log('EVM wallet is not supported yet');
    }

    wallet && setWalletType(walletType);
  };

  const walletContext = {
    wallet: getWalletBySource(walletKey),
    accounts,
    accountKey,
    walletType,
    selectAccount,
    selectedAccount,
    setWallet,
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

  return (
    <WalletContext.Provider value={walletContext as WalletContextInterface}>
      <OpenSelectWallet.Provider value={selectWalletContext}>
        {children}
      </OpenSelectWallet.Provider>
    </WalletContext.Provider>
  );
}
