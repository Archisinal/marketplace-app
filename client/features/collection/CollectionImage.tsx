import React, { FC } from "react";
import { ImageComponent } from "../../components";
import { TAuctionCard } from "../dashboard/AuctionCard";

export type TCollectionImage = {
  styles?: string;
  width?: number;
  height?: number;
} & TAuctionCard;

type TTextPrice = { price: { value: number; currency: string } };
export const TextPrice: FC<TTextPrice> = ({ price }) => (
  <span className="flex gap-2 text-xs absolute bottom-0 w-full bg-dark/50 justify-center rounded-b-2xl py-1.5 pl-2.5 pr-8">
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
    <div className="relative rounded-2xl w-34 sm:w-37 h-34">
      <ImageComponent
        src={itemImg}
        width={width}
        height={height}
        style={{ height: "100%", width: "100%", borderRadius: "inherit" }}
      />
      <TextPrice price={price} />
    </div>
  );
};

export default CollectionImage;
