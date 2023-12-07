import React, { FC } from 'react';
import { useRouter } from 'next/navigation';
import {
  CollectionImage,
  Icon,
  ImageComponent,
  SliderComponent,
} from '../../components';
import { abbriviateNumber, getPercentageDiff } from '../../utils/formaters';

export type TCollectionListItem = {
  itemName: string;
  itemImg: string;
  floorPrice: number;
  currency: string;
  floorChange: number;
  volume: number;
  sales: number;
  items: number;
  owners: number;
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
  const router = useRouter();

  return (
    <div className="-webkit-tap-highlight-color: rgba(255, 255, 255, 0) rounded-2xl border border-stroke-gray p-15px dark:border-vulcan sm:p-5">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <ImageComponent src={itemImg} width={53} height={53} />
          <span className="font-bold sm:text-lg">{itemName}</span>
        </div>
        <div
          onClick={() => router.push('/explore/collection/item')}
          className="self-center rounded-lg bg-white-smoke p-1.5 dark:bg-dark-gray sm:p-3 "
        >
          <Icon name="nextRight" width="16" height="16" />
        </div>
      </div>
      <div className="mt-7 flex">
        <div className="flex flex-col gap-2 border-r pr-8">
          <span className="text-xs text-txt-gray sm:text-sm ">FLOOR PRICE</span>
          <div className="flex items-end items-baseline gap-2">
            <span className="text-xl font-semibold sm:text-2xl">
              {floorPrice}
            </span>
            <span className="text-xs text-txt-gray sm:text-sm">{currency}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 pl-7">
          <span className="text-xs text-txt-gray sm:text-sm">VOLUME</span>
          <div className="flex items-end items-baseline gap-2">
            <span className="text-xl font-semibold sm:text-2xl">
              {abbriviateNumber(volume)}
            </span>
            <span className="text-xs text-txt-gray sm:text-base">
              {currency}
            </span>
          </div>
        </div>
      </div>
      <p
        className={`${
          floorChange > 0 ? 'text-chateau-green' : 'text-red'
        } mt-2 text-sm sm:text-base`}
      >
        {getPercentageDiff(floorChange)}
      </p>

      <div className="mt-7">
        <SliderComponent
          data={collectionItems}
          Component={CollectionImage}
          arrowClass="hidden sm:block top-12"
          options={{
            showDots: false,
            itemClass: '!w-36 sm:!w-42 ',
            centerMode: true,
            containerClass: 'md:justify-center',
          }}
        />
      </div>
    </div>
  );
};

export default CollectionListItem;
