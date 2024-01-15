'use client';

import React from 'react';
import ConnectWalletModalContainer from '@/features/wallet-connect/components/ConnectWalletModalContainer';

function EnsureWalletConnected({
  accountKey,
  closeModalNavigationPath = '/',
}: {
  accountKey?: string;
  closeModalNavigationPath?: string;
}) {
  return (
    <ConnectWalletModalContainer
      open={!accountKey}
      closeModalNavigationPath={closeModalNavigationPath}
    />
  );
}

export default EnsureWalletConnected;
