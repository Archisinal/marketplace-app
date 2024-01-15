// Copyright 2019-2022 @subwallet/wallet-connect authors & contributors
// SPDX-License-Identifier: Apache-2.0
'use client';

import { useLocalStorage } from '@/features/wallet-connect/hooks/useLocalStorage';
import { getWalletBySource } from '@/features/wallet-connect/wallets/dotsama/wallets';
import { Wallet, WalletAccount } from '@/features/wallet-connect/types';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import {
  OpenSelectWallet,
  WalletContext,
  WalletContextInterface,
} from '@/features/wallet-connect/context';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { formatAddress } from '@/utils/formaters';
import { NodeContext } from '@/context';

interface Props {
  children: React.ReactNode;
}

export function WalletContextProvider({ children }: Props) {
  const router = useRouter();
  const { api } = useContext(NodeContext);
  const initWalletFromLocalStorage = async (walletKey: string) => {
    if (!api || !api.registry.chainSS58) {
      console.log('Node is not connected');
      return;
    }
    console.log('Loading wallet from local storage', walletKey);

    const wallet = await selectWallet(getWalletBySource(walletKey)!);
    const accountKey = localStorage.getItem('acc-key');
    if (accountKey) {
      console.log('Loading account from local storage', accountKey);
      const account = JSON.parse(accountKey as string);
      const accounts = await wallet?.getAccounts(api.registry.chainSS58);
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
      } else {
        toast.error(
          `Account ${formatAddress(
            account,
          )} is not connected. Try to connect again.`,
        );
        disconnectWallet();
        router.refresh();
      }
    }
  };

  const [walletKey, setWalletKey] = useLocalStorage(
    'wallet-key',
    undefined,
    initWalletFromLocalStorage,
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

  useEffect(() => {
    if (api && api.registry.chainSS58) {
      initWalletFromLocalStorage(walletKey);
    }
  }, [api]);

  const afterSelectWallet = useCallback(
    async (wallet: Wallet) => {
      if (!api || !api.registry.chainSS58) {
        toast.error('Node is not connected');
        return;
      }
      const infos = await wallet.getAccounts(api.registry.chainSS58);

      infos && setAccounts(infos);
    },
    [api],
  );

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
      if (!api || !api.registry.chainSS58) {
        toast.error('Node is not connected');
        return;
      }
      if (!value) {
        setSelectedAccount(null);
        return;
      }
      const accounts = await currentWallet?.getAccounts(api.registry.chainSS58);
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
    [currentWallet, walletKey, api],
  );

  const disconnectWallet = async () => {
    localStorage.removeItem('acc-key');
    localStorage.removeItem('wallet-key');
    localStorage.removeItem('wallet-type');
    await axios.post('/api/signOut');
    setCurrentWallet(undefined);
    setAccounts([]);
    setSelectedAccount(null);
    setIsSelectWallet(false);
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
