import React from 'react';
import { ImageComponent } from '@/components';
import { collectionComponent } from '@/data/collectionComponent';
import CollectionItems from '@/features/nft/NftsCollectionComponent';
import Description from '@/components/ui/Description';
import { ItemInfo, Socials } from '@/features/collection';
import { abbriviateNumber } from '@/utils/formaters';

const CollectionCardPage = () => {
  const {
    itemImg,
    collectionImg,
    name,
    by,
    address,
    description,
    itemsCount,
    volume,
    floor,
    royalties,
    currency,
  } = collectionComponent;

  const Content = () => {
    return (
      <>
        {/* Desktop screen */}
        <div className="hidden flex-col gap-1 md:flex">
          <div className="flex justify-between">
            <p className="text-3xl font-bold text-black dark:text-white">
              {name}
            </p>
            <Socials
              className="gap-3.5 px-3.5 py-2.5"
              mode="desktop"
              address="architecturehome.com"
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
          <div className="flex justify-between pt-5">
            <Description
              value={description}
              className="w-1/3 text-lg leading-6"
            />
            <ItemInfo
              data={{
                Items: itemsCount,
                Volume: `${abbriviateNumber(volume)} ${currency}`,
                Floor: `${floor} ${currency}`,
                Royalties: `${royalties}%`,
              }}
              mode="tablet"
            />
          </div>
          <div className="dark:text-white">
            <CollectionItems />
          </div>
        </div>

        {/* Tablet screen */}
        <div className="hidden flex-col gap-5 sm:flex md:hidden">
          <div className="flex justify-between">
            <p className="text-3xl font-bold text-black dark:text-white">
              {name}
            </p>
            <Socials className="gap-3.5 px-3.5 py-2.5" />
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
          <ItemInfo
            data={{
              Items: itemsCount,
              Volume: `${abbriviateNumber(volume)} ${currency}`,
              Floor: `${floor} ${currency}`,
              Royalties: `${royalties}%`,
            }}
            mode="tablet"
          />
          <div className="dark:text-white">
            <CollectionItems />
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
          <Description value={description} />
          <div className="pt-7">
            <ItemInfo
              data={{
                Items: itemsCount,
                Volume: `${abbriviateNumber(volume)} ${currency}`,
                Floor: `${floor} ${currency}`,
                Royalties: `${royalties}%`,
              }}
              mode="mobile"
            />
          </div>
          <Socials />
          <div className="dark:text-white">
            <CollectionItems />
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col gap-4 px-4 dark:text-txt-gray sm:px-5">
      <div className="relative sm:w-full">
        <ImageComponent
          src={itemImg}
          className="h-52 rounded-2xl object-cover sm:w-full md:h-72"
        />
        <span className="absolute -left-1.5 top-32 flex rounded-2xl bg-white p-2.5 dark:bg-black-rus md:top-52">
          <ImageComponent
            src={collectionImg}
            width={66}
            height={67}
            style={{ height: '67px', borderRadius: '15px' }}
          />
        </span>
      </div>
      <Content />
    </div>
  );
};

export default CollectionCardPage;
