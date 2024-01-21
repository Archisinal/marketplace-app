import React, { useContext } from 'react';
import { ImageComponent } from '@/components';
import {
  abbriviateNumber,
  formatAddress,
  formatIpfsLink,
  formatPrice,
} from '@/utils/formaters';
import { NodeContext } from '@/context';
import { SCREENS, useScreenSize } from '@/utils/resolutionScreens';
import BN from 'bn.js';

type TSearchListItem = {
  address: string;
  name?: string;
  price?: BN | string;
  itemImg: string;
};

const SearchListItem = ({ name, price, itemImg, address }: TSearchListItem) => {
  const { api } = useContext(NodeContext);
  const screenSize = useScreenSize();
  const isMobile = screenSize == SCREENS.mobile;
  const maxNameLength = isMobile ? 15 : 25;
  return (
    <div className="flex cursor-pointer items-center justify-between px-4 py-2">
      <div className="flex items-center gap-2">
        <span className="relative mr-2 flex h-10 w-10 items-center object-cover">
          <ImageComponent
            fill
            src={formatIpfsLink(itemImg)}
            className="rounded-md"
          />
        </span>
        <div className="overflow-hidden text-sm font-bold">
          {name?.slice(0, maxNameLength)}
          {name && name?.length > maxNameLength && '...'}
        </div>
        <div className="text-sm text-txt-gray ">{formatAddress(address)}</div>
      </div>
      <div className="whitespace-nowrap text-sm font-bold">
        {formatPrice(price, api) || '-'}
      </div>
    </div>
  );
};

export default SearchListItem;
