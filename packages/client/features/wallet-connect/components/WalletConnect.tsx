import IdentIcon from '@/features/wallet-connect/components/Identicon';
import { formatAddress } from '@/utils/formaters';
import { Button } from '@/components';
import React, { useContext, useEffect, useState } from 'react';
import { WalletContext } from '@/features/wallet-connect/context';
import ConnectWalletModal from '@/features/wallet-connect/components/ConnectWalletModal';
import { AnimatePresence } from 'framer-motion';

const WalletConnect = () => {
  const walletContext = useContext(WalletContext);
  const selectedAddress = walletContext.selectedAccount?.[0]?.address;

  const [walletModal, showWalletModal] = useState(false);

  return (
    <>
      {selectedAddress ? (
        <div
          className="flex items-center gap-3 px-8"
          onClick={() => showWalletModal(!walletModal)}
        >
          <IdentIcon address={selectedAddress} />
          <span className="cursor-pointer font-bold">
            {formatAddress(selectedAddress)}
          </span>
        </div>
      ) : (
        <Button
          onClick={() => showWalletModal(true)}
          title="Connect wallet"
          color="transparent-white"
          className="rounded-2xl px-6 py-3 sm:text-base"
        />
      )}
      <AnimatePresence>
        {walletModal && (
          <ConnectWalletModal
            onConnected={() => {
              showWalletModal(false);
            }}
            onClose={() => {
              showWalletModal(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default WalletConnect;
