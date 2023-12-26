import React from 'react';
import { ImageComponent } from '@/components';
import { abbriviateNumber } from '@/utils/formaters';

type TSearchListItem = {
  name: string;
  price: { value: number; currency: string };
  itemImg: string;
  onClick: () => void;
};

const SearchListItem = ({ name, price, itemImg, onClick }: TSearchListItem) => {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center justify-between px-4 text-sm hover:bg-white-smoke sm:text-base dark:hover:bg-vulcan"
    >
      <div className="flex w-3/5 items-center gap-2">
        <span className="flex h-10 w-12 items-center object-cover  lg:h-12 lg:w-14">
          <ImageComponent src={itemImg} />
        </span>
        <span className=" truncate">{name}</span>
      </div>
      <span className="text-xs sm:text-base">{`${abbriviateNumber(
        price.value,
        2,
        false,
      )} ${price.currency}`}</span>
    </div>
  );
};

export default SearchListItem;
