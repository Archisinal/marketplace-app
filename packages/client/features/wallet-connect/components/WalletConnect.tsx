import IdentIcon from '@/features/wallet-connect/components/Identicon';
import { formatAddress, getFormattedBalance } from '@/utils/formaters';
import { Button } from '@/components';
import React, { useContext, useState } from 'react';
import { WalletContext } from '@/features/wallet-connect/context';
import ConnectWalletModal from '@/features/wallet-connect/components/ConnectWalletModal';
import { AnimatePresence, motion } from 'framer-motion';
import { SCREENS, useScreenSize } from '@/utils/resolutionScreens';
import { NodeContext } from '@/context';

const WalletConnect = () => {
  const { api } = useContext(NodeContext);
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
        <motion.div
          className="relative flex items-center gap-3 sm:px-4"
          initial="initial"
          whileHover="hover"
          onClick={() => showWalletModal(!walletModal)}
          onHoverStart={async () => {
            walletContext.setBalance(
              await getFormattedBalance(selectedAddress, api),
            );
          }}
        >
          <IdentIcon address={selectedAddress} />
          <span className="cursor-pointer font-bold">{formattedAddress}</span>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            variants={{
              initial: { opacity: 0, y: 50 },
              hover: { opacity: 1, y: 45 },
            }}
            data-tooltip="tooltip"
            className="absolute -right-2 z-50 p-4"
          >
            <div className="whitespace-nowrap rounded-xl bg-black px-4 py-2 font-semibold text-white">
              Balance: {walletContext.balance}
            </div>
          </motion.div>
        </motion.div>
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
