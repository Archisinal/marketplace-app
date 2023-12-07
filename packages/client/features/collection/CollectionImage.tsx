import React, { FC } from 'react';
import { ImageComponent } from '../../components';
import { TAuctionCard } from '../dashboard/AuctionCard';

export type TCollectionImage = {
  styles?: string;
  width?: number;
  height?: number;
} & TAuctionCard;

type TTextPrice = { price: { value: number; currency: string } };
export const TextPrice: FC<TTextPrice> = ({ price }) => (
  <span className="absolute bottom-0 flex w-full justify-center gap-2 rounded-b-2xl bg-dark/50 py-1.5 pl-2.5 pr-8 text-xs">
    <span className="text-light-gray">Price:</span>
    <span className="text-bold text-white">{price.value}</span>
    <span className="text-white">{price.currency}</span>
  </span>
);

const CollectionImage: FC<TCollectionImage> = ({
  width,
  height,
  itemImg,
  price,
}) => {
  return (
    <div className="relative h-34 w-34 rounded-2xl sm:w-37">
      <ImageComponent
        src={itemImg}
        width={width}
        height={height}
        style={{ height: '100%', width: '100%', borderRadius: 'inherit' }}
      />
      <TextPrice price={price} />
    </div>
  );
};

export default CollectionImage;
