import React, { FC } from "react";
import ImageComponent from "./ImageComponent";

type TItemCard = {
  name: string;
  company: string;
  owner: {
    name: string;
    imgSrc: string;
  };
  price: { value: number; currency: string };
  itemImg: string;
};

const ItemCard: FC<TItemCard> = ({ name, company, owner, price, itemImg }) => {
  return (
    <div className=" flex flex-col  max-w-sm ">
      <div className="h-[228px] translate-y-2.5">
        <ImageComponent
          src={itemImg}
          style={{ height: "100%", width: "100%" }} //aligning images
        />
      </div>
      <div className="border dark:!border-davys-gray rounded-b-20 pt-4">
        <div className="px-5">
          <p className="text-xl font-extrabold">{name}</p>
          <p className="text-txt-gray">{company}</p>
        </div>
        <div className=" px-5 mt-4 mb-4">
          <p className="border-t dark: !border-davys-gray"></p>
          <div className="flex mt-4 items-center">
            <div className="mr-2.5">
              <ImageComponent width={46} height={46} src={owner.imgSrc} />
            </div>
            <div className="flex justify-between w-full">
              <div>
                <p className="text-txt-gray ">By owner</p>
                <p className="text-18px font-semibold">{owner.name}</p>
              </div>
              <div>
                <p className="text-txt-gray">Price</p>
                <p className="text-18px flex gap-1 font-semibold">
                  <span>{price.value}</span>
                  <span className="text-davys-gray">{price.currency}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
