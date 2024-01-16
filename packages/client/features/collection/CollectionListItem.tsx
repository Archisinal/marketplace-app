import React, { FC, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Icon, ImageComponent } from '../../components';
import { formatIpfsLink, formatPrice } from '@/utils/formaters';
import { CollectionWithData } from '@/features/collection/CollectionList';
import { NodeContext } from '@/context';

const CollectionListItem: FC<{ itemData: CollectionWithData }> = ({
  itemData,
}) => {
  const { api } = useContext(NodeContext);
  const { uri, name, floorPrice, volume, items } = itemData;
  const router = useRouter();

  return (
    <div className="-webkit-tap-highlight-color: rgba(255, 255, 255, 0) rounded-2xl border border-stroke-gray p-15px dark:border-vulcan sm:p-5">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-10 w-10">
            <ImageComponent
              fill
              src={formatIpfsLink(uri || '')}
              alt={name}
              className="rounded-md"
            />
          </div>
          <span className="font-bold sm:text-lg">{name}</span>
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
          <span className="text-xs uppercase text-txt-gray sm:text-sm">
            Floor price
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-semibold sm:text-2xl">
              {floorPrice && floorPrice !== Infinity
                ? formatPrice(floorPrice, api)
                : '-'}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-r pl-7 pr-8">
          <span className="text-xs uppercase text-txt-gray sm:text-sm">
            Volume
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-semibold sm:text-2xl">
              {volume ? formatPrice(volume, api) : '-'}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 pl-7">
          <span className="text-xs uppercase text-txt-gray sm:text-sm">
            Items
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-semibold sm:text-2xl">{items}</span>
          </div>
        </div>
      </div>

      {/*      <div className="mt-7">
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
      </div>*/}
    </div>
  );
};

export default CollectionListItem;
