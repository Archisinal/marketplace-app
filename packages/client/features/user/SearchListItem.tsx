import React from 'react';
import { ImageComponent } from '@/components';
import { abbriviateNumber } from '@/utils/formaters';

type TSearchListItem = {
  owner: { name: string; imgSrc: string; followers: number };
  price: { value: number; currency: string };
  onClick: () => void;
};

const SearchListItem = ({ owner, price, onClick }: TSearchListItem) => {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center justify-between px-4 text-sm hover:bg-white-smoke dark:hover:bg-vulcan sm:text-base"
    >
      <div className="flex w-3/5 items-center gap-2">
        <span className="flex h-10 w-12 items-center object-cover  lg:h-12 lg:w-14">
          <ImageComponent fill src={owner.imgSrc} />
        </span>
        <span className=" truncate">{owner.name}</span>
      </div>
      <span className="text-xs sm:text-base">{`${abbriviateNumber(
        owner.followers,
      )} Followers`}</span>
    </div>
  );
};

export default SearchListItem;
