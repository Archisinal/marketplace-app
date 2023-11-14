'use client';

import React, { useContext, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Icon, ImageComponent, Modal } from '@/components';
import {
  getWalletBySource,
  getWallets,
} from '@/features/wallet-connect/wallets/dotsama/wallets';
import {
  getEvmWalletBySource,
  getEvmWallets,
} from '@/features/wallet-connect/wallets/evm/evmWallets';
import {
  OpenSelectWallet,
  WalletContext,
} from '@/features/wallet-connect/context';
import { EvmWallet, Wallet } from '@/features/wallet-connect/types';

type TConectWallet = { onClose: () => void };

const ConnectWallet = ({ onClose }: TConectWallet) => {
  const router = useRouter();
  const openSelectWalletContext = useContext(OpenSelectWallet);
  const walletContext = useContext(WalletContext);

  const dotsamaWallets = getWallets();
  const evmWallets = getEvmWallets();

  const onSelectWallet = useCallback(
    (walletKey: any, walletType: 'substrate' | 'evm' = 'substrate') => {
      if (walletType === 'substrate') {
        // @ts-ignore
        walletContext.setWallet(getWalletBySource(walletKey), walletType);
        openSelectWalletContext.close();
        // navigate('/wallet-info');
        router.push('/wallet/info');
        onClose();
      } else {
        walletContext.setWallet(getEvmWalletBySource(walletKey), walletType);
        openSelectWalletContext.close();
        // navigate('/evm-wallet-info');
        router.push('/wallet/evmWalletInfo');
        onClose();
      }
    },
    [openSelectWalletContext, walletContext],
  );

  const onClickDotsamaWallet = useCallback(
    (wallet: Wallet | EvmWallet) => {
      return () => {
        if (wallet.installed) {
          onSelectWallet(wallet.extensionName);
        }
      };
    },
    [onSelectWallet],
  );

  const onClickEvmWallet = useCallback(
    (wallet: Wallet | EvmWallet) => {
      return () => {
        if (wallet.installed) {
          onSelectWallet(wallet.extensionName, 'evm');
        }
      };
    },
    [onSelectWallet],
  );

  return (
    <Modal
      onClose={() => onClose()}
      title={<p className="text-xl font-bold">Connect a wallet</p>}
      containerClass="ZZZ p-4 rounded-xl fixed sm:relative bottom-0 sm:bottom-auto top-auto sm:top-1/2 translate-y-0 sm:-translate-y-2/4 sm:w-2/4 overflow-auto"
    >
      <div className="mt-4 border-t border-stroke-gray dark:border-dark-gray">
        <div className="mb-10 flex flex-col gap-3.5 pt-4">
          {dotsamaWallets.map((wallet) => {
            return (
              <div
                onClick={onClickDotsamaWallet(wallet)}
                className="flex cursor-pointer gap-2 rounded-2xl border border-stroke-gray p-3 text-lg font-bold hover:bg-white-smoke dark:border-dark-gray dark:hover:bg-davys-gray"
              >
                <ImageComponent src={wallet.logo?.src} width={34} height={34} />
                <span>{wallet.title}</span>
                <span className="font-base ml-auto text-txt-gray">
                  {wallet.installed ? (
                    ''
                  ) : (
                    <a
                      href={wallet.installUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Install
                    </a>
                  )}
                </span>
              </div>
            );
          })}
          <p className="p-2">EVM Wallets</p>
          {evmWallets.map((wallet) => {
            return (
              <div
                onClick={onClickEvmWallet(wallet)}
                className="flex cursor-pointer gap-2 rounded-2xl border border-stroke-gray p-3 text-lg font-bold hover:bg-white-smoke dark:border-dark-gray dark:hover:bg-davys-gray"
              >
                <ImageComponent src={wallet.logo?.src} width={34} height={34} />
                <span>{wallet.title}</span>
                <span className="font-base ml-auto text-txt-gray">
                  {wallet.installed ? (
                    ''
                  ) : (
                    <a
                      href={wallet.installUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Install
                    </a>
                  )}
                </span>
              </div>
            );
          })}
          <div className="flex flex-col gap-2 rounded-2xl bg-button-gray p-3.5 dark:bg-dark">
            <p className="flex justify-between">
              <span className="font-semibold">
                Why don&apos;t I see my wallet?
              </span>
              <span className="cursor-pointer">
                <Icon name="circleInfo" />
              </span>
            </p>
            <p className="cursor-pointer text-txt-gray decoration-1">
              Click here to learn more
            </p>
          </div>
        </div>
        <Button
          onClick={() => onClose()}
          color="white"
          title="Cancel"
          className="w-full rounded-2xl border border-stroke-gray dark:border-txt-gray"
        />
      </div>
    </Modal>
  );
};

export default ConnectWallet;
