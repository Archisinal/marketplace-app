'use client';

import React, { useCallback, useContext, useState } from 'react';
import { message } from 'antd';
import { motion } from 'framer-motion';
import { Button, Icon, ImageComponent, Modal } from '@/components';
import {
  getWalletBySource,
  getWallets,
} from '@/features/wallet-connect/wallets/dotsama/wallets';
import {
  OpenSelectWallet,
  WalletContext,
} from '@/features/wallet-connect/context';
import { Wallet, WalletAccount } from '@/features/wallet-connect/types';
import { formatAddress } from '@/utils/formaters';
import { twMerge } from 'tailwind-merge';

type TConnectWallet = { onClose: () => void; onConnected: () => void };

const ConnectWallet = ({ onClose, onConnected }: TConnectWallet) => {
  const openSelectWalletContext = useContext(OpenSelectWallet);
  const walletContext = useContext(WalletContext);
  const [walletAccounts, setWalletAccounts] = useState<WalletAccount[]>([]);

  const dotsamaWallets = getWallets();

  const onSelectAccount = (account: WalletAccount) => {
    walletContext.selectAccount(account.address);
    onConnected();
  };

  const onSelectWallet = useCallback(
    async (walletKey: any, walletType: 'substrate' | 'evm' = 'substrate') => {
      if (walletType === 'substrate') {
        setWalletAccounts([]);
        walletContext.selectAccount('');
        // @ts-ignore
        walletContext.setWallet(getWalletBySource(walletKey), walletType);

        const accounts = await getWalletBySource(walletKey)?.getAccounts();
        if (accounts && accounts?.length > 1) {
          setWalletAccounts(accounts);
          openSelectWalletContext.close();
        } else if (accounts && accounts?.length == 1) {
          onSelectAccount(accounts[0]);
          openSelectWalletContext.close();
        } else {
          openSelectWalletContext.close();
        }

        if (!accounts?.length) {
          message.warning({
            content: 'No active accounts',
            key: 'no-accounts',
          });
        }
      } else {
        console.log('EVM is not supported yet');
        onClose();
      }
    },
    [openSelectWalletContext, walletContext],
  );

  const onClickDotsamaWallet = useCallback(
    (wallet: Wallet) => {
      return async () => {
        if (wallet.installed) {
          onSelectWallet(wallet.extensionName);
        }
      };
    },
    [onSelectWallet],
  );

  return (
    <Modal
      onClose={() => onClose()}
      title={<span className="text-xl font-bold">Connect a wallet</span>}
      containerClass="p-4 md:p-8 rounded-xl fixed sm:relative bottom-0 sm:bottom-auto sm:w-2/4 overflow-auto"
    >
      <div className="mt-4 border-t border-stroke-gray dark:border-dark-gray">
        <div className="mb-8 flex flex-col gap-3.5 pt-4">
          {dotsamaWallets.map((wallet, i) => {
            return (
              <>
                <div
                  key={i}
                  onClick={onClickDotsamaWallet(wallet)}
                  className={twMerge(
                    'z-10 rounded-2xl border border-stroke-gray bg-white p-3 text-lg font-bold transition dark:border-dark-gray dark:bg-black-rus',
                    wallet.installed
                      ? 'cursor-pointer hover:bg-white-smoke dark:hover:bg-davys-gray'
                      : '',
                  )}
                >
                  <div className="flex items-center gap-4">
                    <ImageComponent
                      src={wallet.logo?.src}
                      width={34}
                      height={34}
                    />
                    <span>{wallet.title}</span>
                    <span className="font-base ml-auto text-txt-gray">
                      {wallet.installed ? (
                        ''
                      ) : (
                        <a
                          href={wallet.installUrl}
                          rel="noreferrer"
                          target="_blank"
                          className="hover: mr-2 opacity-80 transition hover:text-white"
                          onClick={() => onClose()}
                        >
                          Install
                        </a>
                      )}
                    </span>
                  </div>
                </div>
                {walletAccounts.length > 1 &&
                  wallet.extensionName === walletAccounts[0].source && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: 40 + walletAccounts.length * 38,
                        opacity: 1,
                      }}
                      transition={{ duration: 0.1 }}
                      className="mb-3 flex flex-col gap-2.5 transition"
                    >
                      <span className=" text-txt-gray ">{`Choose ${walletContext.wallet?.title} account`}</span>
                      <div className="flex flex-col gap-2">
                        {walletAccounts.map((account) => (
                          <p
                            key={account.address}
                            className="flex cursor-pointer justify-between gap-3 rounded-xl border border-stroke-gray bg-white-smoke px-4 py-2 font-bold transition hover:bg-txt-gray hover:text-white dark:border-dark-gray dark:bg-dark-gray dark:hover:bg-dim-gray"
                            onClick={() => {
                              onSelectAccount(account);
                            }}
                          >
                            <span>{account.name}</span>
                            <span>{formatAddress(account.address)}</span>
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  )}
              </>
            );
          })}
          <div className="flex flex-col gap-2 rounded-2xl bg-button-gray p-3.5 dark:bg-dark">
            <p className="flex justify-between">
              <span className="font-semibold">
                Why don&apos;t I see my wallet?
              </span>
              <span className="">
                <Icon name="circleInfo" />
              </span>
            </p>
            <p className="text-txt-gray decoration-1">
              Currently, we only support Dotsama wallets in Chrome browser.
            </p>
          </div>
        </div>
        <Button
          onClick={() => onClose()}
          color="white"
          title="Cancel"
          className="w-full rounded-2xl"
        />
      </div>
    </Modal>
  );
};

export default ConnectWallet;
