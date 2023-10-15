import React, { FC } from "react";
import { ImageComponent, Icon } from "../../components";

type TNftListItem = {
  name: string;
  price: { value: number; currency: string };
  itemImg: string;
};

const NftListItem: FC<TNftListItem> = ({ name, price, itemImg }) => {
  return (
    <div className="flex flex-col max-w-sm cursor-pointer ">
      <div className="h-[134px] sm:h-[178px] translate-y-2.5">
        <ImageComponent
          src={itemImg}
          style={{ height: "100%", width: "100%" }} //aligning images
        />
      </div>
      <div className="border dark:!border-davys-gray rounded-b-20 pt-4">
        <div className="px-5">
          <p className="font-bold text-sm sm:text-lg truncate">{name}</p>
          <p className="hidden sm:block border-t dark:!border-davys-gray mt-2"></p>
        </div>
        <div className="px-5 mt-2 mb-2 flex gap-2 text-sm sm:text-base">
          <span className="text-txt-gray">Price:</span>
          <span className="dark:text-white sm:font-semibold text-black sm:text-lg">
            {price.value}
          </span>
          <span className="text-txt-gray sm:font-semibold sm:text-lg">
            {price.currency}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NftListItem;
