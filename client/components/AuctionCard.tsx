import React, { FC } from "react";
import ImageComponent from "./ImageComponent";
import Icon from "../icons";

type TAuctionCard = {
  name: string;
  company: string;
  price: { value: number; currency: string };
  endIn: string;
  itemImg: string;
};

const AuctionCard: FC<TAuctionCard> = ({
  name,
  company,
  endIn,
  price,
  itemImg,
}) => {
  return (
    <div className="flex flex-col max-w-sm ">
      <div className="h-[178px] sm:h-[228px] translate-y-2.5">
        <ImageComponent
          src={itemImg}
          style={{ height: "100%", width: "100%" }} //aligning images
        />
      </div>
      <div className="border dark:!border-davys-gray rounded-b-20 pt-4">
        <div className="px-5">
          <p className="font-extrabold">{name}</p>
          <p className="text-txt-gray hidden sm:block">{company}</p>
        </div>
        <div className=" px-5 mt-4 mb-4">
          <p className="border-t dark:!border-davys-gray"></p>
          <div className="flex mt-4 items-center">
            <div className="flex justify-between w-full">
              <div>
                <p className="text-xs text-txt-gray ">Ends in</p>
                <p className="text-[15px] font-semibold">{endIn}</p>
              </div>
              <div>
                <p className="text-xs text-txt-gray">Highest Bid</p>
                <p className="text-[15px] flex gap-1 font-semibold">
                  <span>{price.value}</span>
                  <span className="text-davys-gray">{price.currency}</span>
                  <span>
                    <Icon name="hummer" />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
