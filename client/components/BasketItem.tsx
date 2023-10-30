import React from "react";
import { ImageComponent } from "@/components";
import { abbriviateNumber } from "@/utils/formaters";

type TBasketItem = {
  itemImg: string;
  name: string;
  company: string;
  price: { value: number; currency: string };
};

const BasketItem = ({ itemImg, name, company, price }: TBasketItem) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <div>
          <span>
            <ImageComponent src={itemImg} className="w-11 h-11 rounded-xl" />
          </span>
        </div>
        <div>
          <p className="font-bold">{name}</p>
          <p className="font-semibold text-sm text-txt-gray">{company}</p>
        </div>
      </div>
      <div className="font-bold flex gap-2">
        {/* //TODO:  Dividing /1000 just for demo designs */}
        <span>{abbriviateNumber(price.value / 1000, 2, false)}</span>
        <span className="text-davys-gray">{price.currency}</span>
      </div>
    </div>
  );
};

export default BasketItem;
