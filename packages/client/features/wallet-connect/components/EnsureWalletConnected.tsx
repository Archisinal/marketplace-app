'use client';

import ConnectWalletModal from '@/features/wallet-connect/components/ConnectWalletModal';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { WalletContext } from '@/features/wallet-connect/context';

function EnsureWalletConnected({ closeModalNavigationPath = '/' }) {
  const router = useRouter();
  const walletContext = useContext(WalletContext);
  const isConnected = !!walletContext.selectedAccount?.length;

  const [walletModal, showModal] = useState(!isConnected);

  return (
    <AnimatePresence>
      {walletModal && (
        <ConnectWalletModal
          onConnected={() => {
            showModal(false);
          }}
          onClose={() => {
            router.push(closeModalNavigationPath);
          }}
        />
      )}
    </AnimatePresence>
  );
}

export default EnsureWalletConnected;
