import React from "react";
import { ImageComponent } from "@/components";
import { abbriviateNumber } from "@/utils/formaters";

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
      className="flex items-center justify-between cursor-pointer hover:bg-white-smoke dark:hover:bg-vulcan px-4 text-sm sm:text-base"
    >
      <div className="flex gap-2 items-center">
        <span className="w-12 h-10 flex items-center">
          <ImageComponent src={itemImg} />
        </span>
        <span className="w-40 sm:w-96 md:w-48 truncate">{name}</span>
      </div>
      <span className="text-xs sm:text-base">{`${abbriviateNumber(
        price.value,
        2,
        false
      )} ${price.currency}`}</span>
    </div>
  );
};

export default SearchListItem;
