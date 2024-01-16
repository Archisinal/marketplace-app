'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ConnectWalletModal from '@/features/wallet-connect/components/ConnectWalletModal';

function ConnectWalletModalContainer({
  open = false,
  closeModalNavigationPath = '/',
}) {
  const router = useRouter();
  const [walletModal, showModal] = useState(open);

  useEffect(() => {
    showModal(open);
  }, [open]);

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

export default ConnectWalletModalContainer;
