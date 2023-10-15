import React, { FC } from "react";
import { useMediaQuery } from "react-responsive";
import { RESOLUTION_QUERY } from "../../utils/resolutionScreens";
import {
  ImageComponent,
  Icon,
  CollectionImage,
  SliderComponent,
} from "../../components";
import { getPercentageDiff } from "../../utils/formaters";

import { TAuctionCard } from "../dashboard/AuctionCard";

export type TCollectionListItem = {
  itemName: string;
  itemImg: string;
  floorPrice: number;
  currency: string;
  floorChange: number;
  volume: number;
  sales: number;
  items: string;
  owners: string;
  collectionItems: any[];
};

const CollectionListItem: FC<{ itemData: TCollectionListItem }> = ({
  itemData,
}) => {
  const {
    itemImg,
    itemName,
    floorPrice,
    floorChange,
    volume,
    collectionItems,
    currency,
  } = itemData;

  const isTablet = useMediaQuery(RESOLUTION_QUERY.TABLET);

  return (
    <div className="border rounded-2xl border-stroke-gray dark:border-vulcan p-15px sm:p-5 -webkit-tap-highlight-color: rgba(255, 255, 255, 0)">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <ImageComponent src={itemImg} width={53} height={53} />
          <span className="sm:text-lg font-bold">{itemName}</span>
        </div>
        <div className="rounded-xl p-1.5 sm:p-3 bg-white-smoke dark:bg-dark-gray self-center">
          <Icon name="nextRight" width="16" height="16" />
        </div>
      </div>
      <div className="flex mt-7">
        <div className="pr-8 flex flex-col border-r gap-2">
          <span className="text-xs text-txt-gray sm:text-sm ">FLOOR PRICE</span>
          <div className="gap-2 flex items-end items-baseline">
            <span className="text-xl sm:text-2xl font-semibold">
              {floorPrice}
            </span>
            <span className="text-xs text-txt-gray sm:text-sm">{currency}</span>
          </div>
        </div>
        <div className="pl-7 flex flex-col gap-2">
          <span className="text-xs text-txt-gray sm:text-sm">VOLUME</span>
          <div className="gap-2 flex items-end items-baseline">
            <span className="text-xl sm:text-2xl font-semibold">{volume}</span>
            <span className="text-xs text-txt-gray sm:text-sm">{currency}</span>
          </div>
        </div>
      </div>
      <p
        className={`${
          floorChange > 0 ? "text-chateau-green" : "text-red"
        } text-sm sm:text-base mt-2`}
      >
        {getPercentageDiff(floorChange)}
      </p>

      <div className="mt-7">
        <SliderComponent
          data={collectionItems}
          Component={CollectionImage}
          arrowClass="top-12"
          options={{
            showDots: false,
            itemClass: "!w-36 sm:!w-42 ",
            // "max-w-[134px] sm:max-w-[155px] md:max-w=[229px] lg:max-w-[260px] pb-1",
            arrows: isTablet,
            centerMode: true,
            containerClass: "md:justify-center",
          }}
        />
      </div>
    </div>
  );
};

export default CollectionListItem;
