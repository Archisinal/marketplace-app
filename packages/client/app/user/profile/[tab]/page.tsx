import React from 'react';
import { ImageComponent } from '@/components';
import { userProfileData } from '@/data/collectionComponent';
import CollectionItems from '@/features/nft/NftsCollectionComponent';
import Description from '@/components/ui/Description';
import UserInfo from '@/features/user/UserInfo';
import Socials from '@/features/user/Socials';
import { Button, Tabs } from '@/components';
import Icon from '@/icons';

const tabsConfig = [
  { label: 'Owned', component: CollectionItems },
  { label: 'Sale', component: CollectionItems },
];

const ProfilePage = ({ params }: { params: { tab: string } }) => {
  const {
    itemImg,
    collectionImg,
    name,
    by,
    address,
    description,
    followers,
    following,
    profession,
  } = userProfileData;

  const Content = () => {
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
                  className="min-w-12 h-12 cursor-pointer rounded-2xl p-3"
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
                options={[
                  'globe',
                  'twitter',
                  'discord',
                  'facebook',
                  'linkedin',
                ]}
              />
            </div>
          </div>
          <div className="mt-8 dark:text-white">
            <Tabs
              config={tabsConfig}
              initialTab={params.tab}
              relativePath="/user/profile"
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
                <span className="font-bold text-black dark:text-white">
                  {by}
                </span>
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

  return (
    <div className="container mx-auto flex flex-col gap-4 px-4 dark:text-txt-gray sm:px-5">
      <div className="relative h-36 sm:h-52 sm:w-full md:h-72">
        <ImageComponent
          fill={true}
          src={itemImg}
          className="h-52 rounded-2xl object-cover sm:w-full md:h-72"
          alt="collection-image"
        />
        <span className="absolute -left-1.5 top-24 flex rounded-2xl bg-white p-2.5 dark:bg-black-rus sm:top-40 md:top-60">
          <ImageComponent
            src={collectionImg}
            width={66}
            height={67}
            style={{ height: '67px', borderRadius: '15px' }}
            alt="collection item image"
          />
        </span>
      </div>
      <Content />
    </div>
  );
};

export default ProfilePage;
