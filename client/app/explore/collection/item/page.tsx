"use client";
import React, { FC, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ImageComponent, Icon, TabNav, Filter } from "@/components";
import { collectionComponent } from "@/data/collectionComponent";
import CollectionItems from "@/features/nft/NftsCollectionComponent";

type TCollectionCardPage = {
  name: string;
  itemImg: string;
  collectionImg: string;
  by: string;
  address: string;
  description: string;
  itemsCount: number;
  volume: number;
  currency: string;
  floor: number;
  royalties: number;
  items: [];
};

type TDescription = {
  value: string;
  maxLength?: number;
};
const Description = ({ value, maxLength = 115 }: TDescription) => {
  const isLonger = value.length > maxLength;
  const [expanded, setExpand] = useState(false);

  if (isLonger) {
    return (
      <div className={twMerge("w-full", expanded ? "h-max" : "h-20")}>
        {expanded && value}
        {!expanded && `${value.substr(0, maxLength)}...`}
        <p
          className="font-bold text-black dark:text-white w-max"
          onClick={() => setExpand(!expanded)}
        >
          {expanded ? "Show less" : "Show more"}
        </p>
      </div>
    );
  }
  return <div className={twMerge("w-full h-20")}>{value}</div>;
};

const ItemInfo = ({ data }: { [key: string]: any }) => {
  const values = Object.keys(data);
  return (
    <ul className="border rounded-2xl border-stroke-gray dark:border-dark-gray px-4">
      {values.map((val, i) => {
        console.log(i);

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
};

const Socials = () => {
  return (
    <div className="border border-stroke-gray dark:border-dark-gray rounded-2xl px-7 py-2.5 flex gap-8 text-black dark:text-white">
      <span>
        <Icon name="globe" />
      </span>
      <span className="border-r border-stroke-gray dark:border-dark-gray"></span>
      <span>
        <Icon name="twitter" />
      </span>
      <span className="border-r border-stroke-gray dark:border-dark-gray"></span>
      <span>
        <Icon name="discord" />
      </span>
      <span className="border-r border-stroke-gray dark:border-dark-gray"></span>
      <span>
        <Icon name="facebook" />
      </span>
    </div>
  );
};

const CollectionCardPage: FC<TCollectionCardPage> = () => {
  const {
    itemImg,
    collectionImg,
    name,
    by,
    address,
    description,
    items,
    itemsCount,
    volume,
    floor,
    royalties,
    currency,
  } = collectionComponent;

  return (
    <div className="px-4 flex flex-col gap-4 dark:text-txt-gray">
      <div className="relative sm:w-full">
        <ImageComponent
          src={itemImg}
          className="sm:w-full h-52 object-cover rounded-2xl"
        />
        <span className="flex bg-white dark:bg-black-rus p-4 absolute top-28 rounded-2xl -left-1.5">
          <ImageComponent
            src={collectionImg}
            width={66}
            height={67}
            style={{ height: "67px", borderRadius: "15px" }}
          />
        </span>
      </div>

      <div className="flex flex-col gap-3.5 pt-1">
        <p className="text-2xl text-black dark:text-white font-bold">{name}</p>
        <div className="text-txt-gray flex justify-between">
          <div>
            By{" "}
            <span className="text-black dark:text-white font-bold">{by}</span>
          </div>
          <div>
            Adress{" "}
            <span className="text-black dark:text-white font-bold">
              {address}
            </span>
          </div>
        </div>
      </div>
      <div>
        <Description value={description} />
      </div>
      <div className="pt-7">
        <ItemInfo
          data={{
            Items: itemsCount,
            Volume: `${volume}K ${currency}`,
            Floor: `${floor} ${currency}`,
            Royalties: `${royalties}%`,
          }}
        />
      </div>
      <div>
        <Socials />
      </div>
      <div className="dark:text-white">
        <CollectionItems />
      </div>
    </div>
  );
};

export default CollectionCardPage;
