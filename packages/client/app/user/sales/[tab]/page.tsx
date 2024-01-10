import React from 'react';
import { Button, Tabs } from '@/components';
import { userProfileData } from '@/data/collectionComponent';
import CollectionItems from '@/features/nft/NftsCollectionComponent';
import Description from '@/components/ui/Description';
import UserInfo from '@/features/user/UserInfo';
import Socials from '@/features/user/Socials';
import Icon from '@/icons';
import EnsureWalletConnected from '@/features/wallet-connect/components/EnsureWalletConnected';
import ProfileHeader from '@/features/user/ProfileHeader';

const tabsConfig = [
  { label: 'Owned', component: CollectionItems },
  { label: 'Sale', component: CollectionItems },
];

const ProfilePage = ({ params }: { params: { tab: string } }) => {
  return (
    <div className="container mx-auto flex flex-col gap-4 px-4 py-4 dark:text-txt-gray sm:px-5">
      <EnsureWalletConnected />
      <ProfileHeader />
      <Content params={params} />
    </div>
  );
};

const Content = ({ params }: { params: { tab: string } }) => {
  const { name, by, address, description, followers, following, profession } =
    userProfileData;

  return (
    <>
      {/* Desktop screen */}
      <div className="hidden flex-col gap-1 md:flex">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2.5">
            <p className="text-3xl font-bold text-black dark:text-white">
              {name}
            </p>
            <div>
              Adress{' '}
              <span className="font-bold text-black dark:text-white">
                {address}
              </span>
            </div>
            <Description
              value={description}
              className="w-5/12 pt-2.5 text-lg leading-6"
            />
            <div className="flex w-1/4 items-center justify-between gap-4">
              <Button
                title={
                  <span className="flex cursor-pointer items-center gap-2.5 text-base ">
                    Edit Profile <Icon name="squareEdit" />
                  </span>
                }
                color="silver-dark"
                className="w-full rounded-2xl p-3"
              />
              <Button
                title={<Icon name="share" />}
                color="silver-dark"
                className="h-12 min-w-12 cursor-pointer rounded-2xl p-3"
              />
            </div>
          </div>
          <div className="flex w-80 flex-col justify-between gap-5 pt-5">
            <UserInfo
              data={{
                Followers: followers,
                Following: following,
                Profession: profession,
              }}
            />
            <Socials
              className="justify-between gap-3.5 px-3.5 py-2.5"
              mode="desktop"
              address="architecturehome.com"
              options={['globe', 'twitter', 'discord', 'facebook', 'linkedin']}
            />
          </div>
        </div>
        <div className="mt-8 dark:text-white">
          <Tabs
            config={tabsConfig}
            initialTab={params.tab}
            relativePath="/user/sales"
          />
        </div>
      </div>

      {/* Tablet screen */}
      <div className="hidden flex-col gap-5 sm:flex md:hidden">
        <div className="flex justify-between">
          <p className="text-3xl font-bold text-black dark:text-white">
            {name}
          </p>
          <Socials
            className="gap-3.5 px-3.5 py-2.5"
            options={['globe', 'twitter', 'discord', 'facebook', 'linkedin']}
          />
        </div>
        <div className="flex gap-7 text-txt-gray">
          <div>
            By{' '}
            <span className="font-bold text-black dark:text-white">{by}</span>
          </div>
          <div>
            Adress{' '}
            <span className="font-bold text-black dark:text-white">
              {address}
            </span>
          </div>
        </div>
        <Description value={description} maxLength={250} />
        <UserInfo
          data={{
            Followers: followers,
            Following: following,
            Profession: profession,
          }}
        />
        <div className="flex items-center justify-between gap-4">
          <Button
            title={
              <span className="flex cursor-pointer items-center gap-2.5 text-base ">
                Edit Profile <Icon name="squareEdit" />
              </span>
            }
            color="silver-dark"
            className="w-full rounded-2xl p-3"
          />
          <Button
            title={<Icon name="share" />}
            color="silver-dark"
            className="h-12 w-12 cursor-pointer rounded-2xl p-3"
          />
        </div>
        <div className="mt-8 dark:text-white">
          <Tabs
            config={tabsConfig}
            initialTab={params.tab}
            relativePath="/user/profile"
          />
        </div>
      </div>

      {/* Mobile screen */}
      <div className="flex flex-col gap-4 sm:hidden">
        <div className="flex flex-col gap-3.5 pt-1 ">
          <p className="text-2xl font-bold text-black dark:text-white">
            {name}
          </p>
          <div className="flex justify-between text-txt-gray">
            <div>
              By{' '}
              <span className="font-bold text-black dark:text-white">{by}</span>
            </div>
            <div>
              Adress{' '}
              <span className="font-bold text-black dark:text-white">
                {address}
              </span>
            </div>
          </div>
        </div>
        <Description value={description} className="mb-0" />
        <div className="pt-7">
          <UserInfo
            data={{
              Followers: followers,
              Following: following,
              Profession: profession,
            }}
          />
        </div>
        <Socials options={['globe', 'twitter', 'discord', 'facebook']} />
        <div className="flex items-center justify-between gap-4">
          <Button
            title={
              <span className="flex cursor-pointer items-center gap-2.5 text-base ">
                Edit Profile <Icon name="squareEdit" />
              </span>
            }
            color="silver-dark"
            className="w-9/12 rounded-2xl p-3"
          />
          <Button
            title={<Icon name="share" />}
            color="silver-dark"
            className="h-12 w-12 cursor-pointer rounded-2xl p-3"
          />
        </div>
        <div className="mt-8 dark:text-white">
          <Tabs
            config={tabsConfig}
            initialTab={params.tab}
            relativePath="/user/profile"
          />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
