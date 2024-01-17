'use client';

import { Button } from '@/components';
import Icon from '@/icons';
import UserInfo from '@/features/user/UserInfo';
import React, { useContext } from 'react';
import { WalletContext } from '@/features/wallet-connect/context';
import { formatAddress } from '@/utils/formaters';
import { twMerge } from 'tailwind-merge';

const ProfileActions = ({ className }: { className?: string }) => {
  return (
    <div className={twMerge('flex w-full gap-4', className)}>
      <Button
        title={
          <span className="flex cursor-pointer items-center gap-2.5 text-base ">
            Edit Profile <Icon name="squareEdit" />
          </span>
        }
        color="silver-dark"
        className="w-full min-w-[200px] rounded-2xl p-3"
      />
      <Button
        title={<Icon name="share" />}
        color="silver-dark"
        className="h-12 min-w-12 cursor-pointer rounded-2xl p-3"
      />
    </div>
  );
};
const ProfileInfo = () => {
  const walletContext = useContext(WalletContext);
  const name = walletContext.selectedAccount?.[0]?.name;
  const address = walletContext.selectedAccount?.[0]?.address;

  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-3xl font-bold text-black dark:text-white">
                {name}
              </p>
              <div className="flex gap-2">
                <span>Address</span>
                <span className="font-bold text-black dark:text-white">
                  {formatAddress(address)}
                </span>
              </div>
            </div>
            <ProfileActions className="hidden sm:flex" />
          </div>
          <div className="flex w-full flex-col justify-between gap-5 sm:w-80">
            <UserInfo
              data={{
                Followers: '-',
                Following: '-',
                Profession: 'Architect',
              }}
            />
          </div>
          <ProfileActions className="sm:hidden" />
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
