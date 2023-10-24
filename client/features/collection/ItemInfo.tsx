import React from "react";
import { twMerge } from "tailwind-merge";

type TItemInfo = {
  data: { [key: string]: any };
  mode: "desktop" | "tablet" | "mobile";
};

const ItemInfo = ({ data, mode }: TItemInfo) => {
  switch (mode) {
    case "desktop": {
      return <div></div>;
    }
    case "tablet": {
      const { Items, Floor, Volume, Royalties, currency } = data;
      return (
        <ul className="grid grid-cols-1 md:w-2/4 border rounded-2xl border-stroke-gray dark:border-dark-gray text-lg h-32 lg:w-2/6">
          <li className="grid grid-cols-2 gap-2 p-4 border-b border-stroke-gray dark:border-dark-gray">
            <div className="border-r border-stroke-gray dark:border-dark-gray flex justify-between pr-2.5">
              <span className="text-txt-gray dark:text-white">Items</span>
              <span className="font-semibold">{Items}</span>
            </div>
            <div className="text-end flex justify-between">
              <span className="text-txt-gray dark:text-white">Floor</span>
              <span className="font-semibold">{Floor}</span>
            </div>
          </li>
          <li className="grid grid-cols-2 gap-2 p-4">
            <div className="border-r border-stroke-gray dark:border-dark-gray flex justify-between pr-2.5">
              <span className="text-txt-gray dark:text-white">Volume</span>
              <span className="font-semibold">{Volume}</span>
            </div>
            <div className="text-end flex justify-between ">
              <span className="text-txt-gray dark:text-white">Royalties</span>
              <span className="font-semibold">{Royalties}</span>
            </div>
          </li>
        </ul>
      );
    }
    default: {
      const values = Object.keys(data);
      return (
        <ul className="border rounded-2xl border-stroke-gray dark:border-dark-gray px-4">
          {values.map((val, i) => {
            return (
              <li
                className={twMerge(
                  "py-4 flex justify-between items-center",
                  i !== values.length - 1
                    ? "border-b border-stroke-gray dark:border-dark-gray"
                    : "border-none"
                )}
              >
                <span className="text-txt-gray dark:text-white">{val}</span>
                <span className="font-semibold text-black dark:text-txt-gray">
                  {data[val]}
                </span>
              </li>
            );
          })}
        </ul>
      );
    }
  }
};

export default ItemInfo;
