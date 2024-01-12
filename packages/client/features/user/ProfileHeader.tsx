'use client';

import { ImageComponent } from '@/components';
import IdentIcon from '@/features/wallet-connect/components/Identicon';
import React, { useContext } from 'react';
import { WalletContext } from '@/features/wallet-connect/context';
import { SCREENS, useScreenSize } from '@/utils/resolutionScreens';

function ProfileHeader() {
  const walletContext = useContext(WalletContext);
  const selectedAddress = walletContext.selectedAccount?.[0]?.address;
  const screenSize = useScreenSize();
  const isMobile = screenSize == SCREENS.mobile;

  return (
    <div className="relative flex h-28 sm:h-52 sm:w-full md:h-72">
      <ImageComponent
        fill={true}
        src="/bg/profile-header-big.jpg"
        className="h-52 rounded-2xl object-cover sm:w-full md:h-72"
        alt="profile-header"
      />
      <span className="absolute -bottom-[1px] flex rounded-r-2xl bg-white pr-3 dark:bg-black-rus sm:rounded-br-none sm:rounded-tr-2xl sm:pr-4 sm:pt-4">
        {selectedAddress && (
          <div className="flex rounded-2xl bg-[#1D252C]">
            <IdentIcon size={isMobile ? 119 : 150} address={selectedAddress} />
          </div>
        )}
      </span>
    </div>
  );
}

export default ProfileHeader;
