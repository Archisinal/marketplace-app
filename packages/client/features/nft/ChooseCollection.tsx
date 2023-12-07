import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Icon, ImageComponent } from '@/components';

const collections = [
  {
    id: '1',
    collectionName: 'AlexByArc',
    collectionOwner: 'AlexByArc',
  },
  {
    id: '2',
    collectionName: 'HomeCreate',
    collectionOwner: 'Leny',
  },
];

type TChooseCollection = {
  onCollectionSelect: (collectionId: string) => void;
  selectedCollectionId: string;
  onCreateCollection: (v: boolean) => void;
};

const ChooseCollection = ({
  onCollectionSelect,
  selectedCollectionId,
  onCreateCollection,
}: TChooseCollection) => {
  const activeClass = 'border-black dark:border-white';
  return (
    <div className="flex flex-col gap-3">
      <p className="font-bold">Choose collection</p>
      <div className="grid grid-cols-3 gap-2 sm:flex">
        {collections?.map(({ collectionName, collectionOwner, id }) => (
          <div
            key={id}
            className={twMerge(
              'flex cursor-pointer flex-col items-center gap-2 rounded-2xl border p-4 dark:border-vulcan sm:w-32',
              selectedCollectionId === id ? activeClass : '',
            )}
            onClick={() => onCollectionSelect(id)}
          >
            <ImageComponent
              src="/mockAssets/3.png"
              className="h-14 w-14 rounded-2xl"
            />
            <p className="text-sm font-semibold">{collectionName}</p>
            <p className="text-xs text-txt-gray">{collectionOwner}</p>
          </div>
        ))}
        <div
          className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl p-4 font-semibold text-txt-gray dark:text-white sm:w-32"
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
    </div>
  );
};

export default ChooseCollection;
