import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Icon, ImageComponent } from '@/components';
import { formatAddress, formatIpfsLink } from '@/utils/formaters';

type TChooseCollection = {
  onCollectionSelect: (collectionId: string) => void;
  selectedCollectionId?: string;
  onCreateCollection: (v: boolean) => void;
  collections?: any[];
  errorMessage?: string | boolean;
};

const ChooseCollection = ({
  onCollectionSelect,
  selectedCollectionId,
  onCreateCollection,
  collections,
  errorMessage,
}: TChooseCollection) => {
  const activeClass = 'border-black dark:border-white';
  return (
    <div className="flex flex-col gap-3">
      <p className="font-bold">Choose collection</p>
      <div className="grid min-h-[150px] grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-3">
        {collections?.map(({ address, name, uri }) => (
          <div
            key={address}
            className={twMerge(
              'flex cursor-pointer flex-col items-center overflow-hidden rounded-2xl border transition dark:border-vulcan dark:hover:border-gray-400',
              selectedCollectionId === address ? activeClass : '',
            )}
            onClick={() => onCollectionSelect(address)}
          >
            <div className="relative h-20 w-full">
              <ImageComponent
                fill
                src={formatIpfsLink(uri)}
                className=" rounded-b-2xl object-cover object-center"
              />
            </div>
            <div className="w-full p-4 text-center">
              <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-semibold">
                {name}
              </p>
              <p className="text-xs text-txt-gray">{formatAddress(address)}</p>
            </div>
          </div>
        ))}
        <div
          className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed p-4 font-semibold text-txt-gray transition sm:w-32 dark:border-vulcan dark:text-white dark:hover:border-gray-400"
          onClick={() => {
            document.documentElement.style.overflow = 'hidden';
            onCreateCollection(true);
          }}
        >
          <span>
            <Icon name="circleAddFilled" />
          </span>
          <span>Create</span>
        </div>
      </div>
      {errorMessage && <p className="text-danger-light">{errorMessage}</p>}
    </div>
  );
};

export default ChooseCollection;
