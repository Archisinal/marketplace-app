'use client';

import React, { useContext, useCallback, useState } from 'react';
import { message } from 'antd';
import { motion } from 'framer-motion';
import { Button, Icon, ImageComponent, Modal } from '@/components';
import {
  getWalletBySource,
  getWallets,
} from '@/features/wallet-connect/wallets/dotsama/wallets';
import { getEvmWalletBySource } from '@/features/wallet-connect/wallets/evm/evmWallets';
import {
  OpenSelectWallet,
  WalletContext,
} from '@/features/wallet-connect/context';
import {
  EvmWallet,
  Wallet,
  WalletAccount,
} from '@/features/wallet-connect/types';
import { truncate } from '@/utils/formaters';

type TConnectWallet = { onClose: () => void };

const ConnectWallet = ({ onClose }: TConnectWallet) => {
  const openSelectWalletContext = useContext(OpenSelectWallet);
  const walletContext = useContext(WalletContext);
  const [walletAccounts, setWalletAccounts] = useState<WalletAccount[]>([]);

  const dotsamaWallets = getWallets();

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
        } else {
          openSelectWalletContext.close();
          onClose();
        }

        if (!accounts?.length) {
          message.warning({
            content: 'No active accounts',
            key: 'no-accounts',
          });
        }
      } else {
        walletContext.setWallet(getEvmWalletBySource(walletKey), walletType);
        openSelectWalletContext.close();
        onClose();
      }
    },
    [openSelectWalletContext, walletContext],
  );

  const onClickDotsamaWallet = useCallback(
    (wallet: Wallet | EvmWallet) => {
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
        <div className="mb-10 flex flex-col gap-3.5 pt-4">
          {dotsamaWallets.map((wallet, i) => {
            return (
              <>
                <div
                  key={i}
                  onClick={onClickDotsamaWallet(wallet)}
                  className=" z-10 cursor-pointer rounded-2xl border border-stroke-gray bg-white p-3 text-lg font-bold transition hover:bg-white-smoke dark:border-dark-gray dark:bg-black-rus dark:hover:bg-davys-gray"
                >
                  <div className="flex gap-2">
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
                      <span className="font-semibold">{`Choose ${walletContext.wallet?.title} account`}</span>
                      <div className="flex flex-col gap-2">
                        {walletAccounts.map((acc, i) => (
                          <p
                            key={i}
                            className="flex cursor-pointer gap-3 rounded-xl border border-stroke-gray bg-white-smoke p-1.5 font-bold transition hover:bg-txt-gray hover:text-white dark:border-dark-gray dark:bg-dark-gray dark:hover:bg-dim-gray"
                            onClick={() => {
                              walletContext.selectAccount(acc.address);
                              onClose();
                            }}
                          >
                            <span>{acc.name}</span>
                            <span>{truncate(acc.address, 4, 4, 12)}</span>
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
