import React from 'react';
import { getAccountKeyFromCookies } from '@/utils/auth-utils';
import ConnectWalletModalContainer from '@/features/wallet-connect/components/ConnectWalletModalContainer';

function EnsureWalletConnected({ closeModalNavigationPath = '/' }) {
  const accountKey = getAccountKeyFromCookies();

  return (
    <ConnectWalletModalContainer
      open={!accountKey}
      closeModalNavigationPath={closeModalNavigationPath}
    />
  );
}

export default EnsureWalletConnected;
