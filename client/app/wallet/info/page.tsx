'use client';
import { Wallet } from '@/features/wallet-connect/types';
import React, { useContext } from 'react';

import AccountList from '@/features/wallet-connect/components/AccountList';
import WalletMetadata from '@/features/wallet-connect/components/WalletMetadata';
import { WalletContext } from '@/features/wallet-connect/context';

function WalletInfo(): React.ReactElement {
  const walletContext = useContext(WalletContext);

  return (
    <div>
      <div>
        <div>
          Version: {(walletContext?.wallet as Wallet)?.extension?.version}
        </div>
        <div>Account List</div>
        <AccountList />
        <div>Metadata</div>
        <WalletMetadata />
      </div>
    </div>
  );
}

export default WalletInfo;
