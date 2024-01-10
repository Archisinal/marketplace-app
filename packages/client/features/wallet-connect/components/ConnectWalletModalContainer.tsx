'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ConnectWalletModal from '@/features/wallet-connect/components/ConnectWalletModal';

function ConnectWalletModalContainer({
  open = false,
  closeModalNavigationPath = '/',
}) {
  'use client';

  const router = useRouter();
  const [walletModal, showModal] = useState(open);

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
