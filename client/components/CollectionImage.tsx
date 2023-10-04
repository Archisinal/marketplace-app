import React, { FC } from "react";
import { ImageComponent } from "../components";
import { TAuctionCard } from "../components/AuctionCard";

export type TCollectionImage = {
  styles?: string;
  width?: number;
  height?: number;
} & TAuctionCard;

type TTextPrice = { price: { value: number; currency: string } };
export const TextPrice: FC<TTextPrice> = ({ price }) => (
  <span className="flex gap-2 absolute bottom-0 w-full bg-dark/50 justify-center rounded-b-lg">
    <span className="text-light-gray">Price:</span>
    <span className="text-bold text-white">{price.value}</span>
    <span className="text-white">{price.currency}</span>
  </span>
);

const CollectionImage: FC<TCollectionImage> = ({
  //   styles,
  width = 155,
  height = 115,
  itemImg,
  price,
}) => {
  return (
    <div className={`relative rounded-xl max-w-[155px]`}>
      <ImageComponent
        src={itemImg}
        width={width}
        height={115}
        style={{ height: `${height}px`, width: `100%` }}
      />
      <TextPrice price={price} />
    </div>
  );
};

export default CollectionImage;
