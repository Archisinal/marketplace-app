'use client';

import { ImageComponent } from '@/components';
import IdentIcon from '@/features/wallet-connect/components/Identicon';
import React, { useContext } from 'react';
import { WalletContext } from '@/features/wallet-connect/context';

function ProfileHeader() {
  const walletContext = useContext(WalletContext);
  const selectedAddress = walletContext.selectedAccount?.[0]?.address;

  return (
    <div className="relative h-36 sm:h-52 sm:w-full md:h-72">
      <ImageComponent
        fill={true}
        src={'/bg/profile-header-big.jpg'}
        className="h-52 rounded-2xl object-cover sm:w-full md:h-72"
        alt="profile-header"
      />
      <span className="absolute bottom-0 flex rounded-tr-2xl bg-white pr-4 pt-4 dark:bg-black-rus">
        {selectedAddress && (
          <div className="rounded-2xl bg-[#1D252C]">
            <IdentIcon size={150} address={selectedAddress} />
          </div>
        )}
      </span>
    </div>
  );
}

export default ProfileHeader;
