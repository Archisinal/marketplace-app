// Copyright 2019-2022 @subwallet/sub-connect authors & contributors
// SPDX-License-Identifier: Apache-2.0
'use client';
import React, { useContext, useEffect, useCallback } from 'react';
import { Button, ImageComponent } from '@/components';
import { WalletContextProvider } from '@/features/wallet-connect/providers';
import { getWallets } from '@/features/wallet-connect/wallets/dotsama/wallets';
import logoWallet from '@/features/wallet-connect/wallets/dotsama/predefinedWallet/NovaWalletLogo.svg';

import {
  OpenSelectWallet,
  WalletContext,
} from '@/features/wallet-connect/context';

function Welcome(): React.ReactElement {
  const selectWallet = useContext(OpenSelectWallet);
  const walletContext = useContext(WalletContext);
  const dotsamaWallets = getWallets();

  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     if (walletContext.wallet && walletContext.walletType === 'substrate') {
  //       navigate('/wallet-info');
  //     } else if (walletContext.evmWallet && walletContext.walletType === 'evm') {
  //       navigate('/evm-wallet-info');
  //     }
  //   }, [navigate, walletContext]);
  const onClickDotsamaWallet = useCallback((wallet: any) => {
    return () => {
      if (wallet.installed) {
        // onSelectWallet(wallet.extensionName);
      }
    };
  }, []);

  const walletItem: (
    wallet: any,
    onSelect: (wallet: any) => () => void,
  ) => React.ReactElement = (wallet, onSelect) => (
    <div
      className={'wallet-item'}
      key={wallet.extensionName}
      onClick={onSelect(wallet)}
    >
      <div>
        <ImageComponent
          alt={wallet.logo?.alt}
          width={20}
          height={20}
          src={wallet.logo?.src}
        />
      </div>
      <div className={'wallet-title'}>{wallet.title}</div>
      <div className={'wallet-install'}>
        {wallet.installed ? (
          ''
        ) : (
          <a href={wallet.installUrl} rel="noreferrer" target="_blank">
            Install
          </a>
        )}
      </div>
    </div>
  );

  return (
    <WalletContextProvider>
      <div className={'welcome-wrapper'}>
        <div className={'welcome-content'}>
          <div className="welcome-content__text">
            Welcome to SubWallet Connect
          </div>
          <Button
            className="sub-wallet-btn sub-wallet-btn-normal-size"
            onClick={selectWallet.open}
            title="Select wallet"
          />
        </div>
        {dotsamaWallets.map((wallet) =>
          walletItem(wallet, onClickDotsamaWallet),
        )}
      </div>
    </WalletContextProvider>
  );
}

export default Welcome;
