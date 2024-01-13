import IdentIcon from '@/features/wallet-connect/components/Identicon';
import { formatAddress } from '@/utils/formaters';
import { Button } from '@/components';
import React, { useContext, useEffect, useState } from 'react';
import { WalletContext } from '@/features/wallet-connect/context';
import ConnectWalletModal from '@/features/wallet-connect/components/ConnectWalletModal';
import { AnimatePresence } from 'framer-motion';
import { SCREENS, useScreenSize } from '@/utils/resolutionScreens';

const WalletConnect = () => {
  const walletContext = useContext(WalletContext);
  const selectedAddress = walletContext.selectedAccount?.[0]?.address;
  const screenSize = useScreenSize();

  const [walletModal, showWalletModal] = useState(false);

  const formattedAddress =
    screenSize === SCREENS.mobile
      ? formatAddress(selectedAddress, 2, 4, 9)
      : formatAddress(selectedAddress);

  return (
    <>
      {selectedAddress ? (
        <div
          className="flex items-center gap-3 sm:px-4"
          onClick={() => showWalletModal(!walletModal)}
        >
          <IdentIcon address={selectedAddress} />
          <span className="cursor-pointer font-bold">{formattedAddress}</span>
        </div>
      ) : (
        <Button
          onClick={() => showWalletModal(true)}
          title="Connect wallet"
          color="transparent-white"
          className="rounded-2xl px-2 py-2 text-sm sm:px-6 sm:py-3 sm:text-base"
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
