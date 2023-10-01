import React, { FC } from "react";
import { useMediaQuery } from "react-responsive";
import ImageComponent from "./ImageComponent";
import Icon from "../icons";
import { RESOLUTION_QUERY } from "../utils/resolutionScreens";

type TCollectionCard = {
  name: string;
  company: string;
  price: { value: number; currency: string };
  volume24h: number;
  itemImg: string;
  total: { value: number; dif: number };
};

const CollectionCard: FC<TCollectionCard> = ({
  name,
  company,
  volume24h,
  price,
  total,
  itemImg,
}) => {
  const isTablet = useMediaQuery(RESOLUTION_QUERY.TABLET);

  return (
    <div className="flex flex-col max-w-sm ">
      <div className="h-[178px] sm:h-[228px] translate-y-2.5">
        <ImageComponent
          src={itemImg}
          style={{ height: "100%", width: "100%" }} //aligning images
        />
      </div>
      <div>
        {!isTablet && (
          <div className="border dark:!border-davys-gray rounded-b-20 pt-4">
            <div className="px-5 text-xl">
              <p className="font-extrabold">{company}</p>
            </div>
            <div className=" px-5 mt-4 mb-4">
              <p className="border-t dark:!border-davys-gray"></p>
              <div className="flex mt-4 items-center">
                <div className="flex justify-between w-full">
                  <div>
                    <p className="text-xs text-txt-gray ">Floor:</p>
                    <p className="text-[15px] font-semibold">
                      <span>{price.value}</span>
                      <span>{price.currency}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-txt-gray">24h volume</p>
                    <p className="text-[15px] flex gap-1 font-semibold">
                      <span>{volume24h}</span>
                      <span className="text-davys-gray">{price.currency}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {isTablet && (
          <div className="border dark:!border-davys-gray rounded-b-20 pt-6 pb-4">
            <div className="px-5 flex justify-between">
              <div className="text-xl font-extrabold">{company}</div>
              <div className="text-18px font-semibold flex gap-1.5">
                <span>{price.value}</span>
                <span className="dark:text-raven">{price.currency}</span>
              </div>
            </div>
            <div className="flex justify-between px-5">
              <div className="flex gap-1.5">
                <span className="text-txt-gray">Floor:</span>
                <span className="dark:text-white text-davys-gray">{`${price.value} ${price.currency}`}</span>
              </div>
              <div className="flex gap-1.5">
                <span className="dark:text-white text-davys-gray">{`$${total.value}`}</span>
                <span className="text-dark-pastel-green">{`+${total.dif}%`}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionCard;
