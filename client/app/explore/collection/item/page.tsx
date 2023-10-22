"use client";
import React, { FC } from "react";
import { useMediaQuery } from "react-responsive";
import { ImageComponent } from "@/components";
import { collectionComponent } from "@/data/collectionComponent";
import CollectionItems from "@/features/nft/NftsCollectionComponent";
import Description from "@/components/ui/Description";
import { ItemInfo, Socials } from "@/features/collection";
import { RESOLUTION_QUERY } from "@/utils/resolutionScreens";

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

  const isTablet = useMediaQuery(RESOLUTION_QUERY.TABLET);
  const isDesktop = useMediaQuery(RESOLUTION_QUERY.DESKTOP);

  const Content = () => {
    if (isDesktop) {
      return (
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <p className="text-3xl text-black dark:text-white font-bold">
              {name}
            </p>
            <Socials
              className="px-3.5 py-2.5 gap-3.5"
              mode="desktop"
              address="architecturehome.com"
            />
          </div>
          <div className="text-txt-gray flex gap-7">
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
          <div className="pt-5 flex justify-between">
            <Description
              value={description}
              className="w-1/3 text-lg leading-6"
            />
            <ItemInfo
              data={{
                Items: itemsCount,
                Volume: `${volume}K ${currency}`,
                Floor: `${floor} ${currency}`,
                Royalties: `${royalties}%`,
              }}
              mode="tablet"
            />
          </div>
          <div className="dark:text-white">
            <CollectionItems buttons={[]} />
          </div>
        </div>
      );
    }
    if (isTablet && !isDesktop) {
      return (
        <div className="flex flex-col gap-5">
          <div className="flex justify-between">
            <p className="text-3xl text-black dark:text-white font-bold">
              {name}
            </p>
            <Socials className="px-3.5 py-2.5 gap-3.5" />
          </div>
          <div className="text-txt-gray flex gap-7">
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
          <Description value={description} maxLength={250} />
          <ItemInfo
            data={{
              Items: itemsCount,
              Volume: `${volume}K ${currency}`,
              Floor: `${floor} ${currency}`,
              Royalties: `${royalties}%`,
            }}
            mode="tablet"
          />
          <div className="dark:text-white">
            <CollectionItems buttons={[]} />
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="flex flex-col gap-3.5 pt-1">
          <p className="text-2xl text-black dark:text-white font-bold">
            {name}
          </p>
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
        <Description value={description} />
        <div className="pt-7">
          <ItemInfo
            data={{
              Items: itemsCount,
              Volume: `${volume}K ${currency}`,
              Floor: `${floor} ${currency}`,
              Royalties: `${royalties}%`,
            }}
            mode="mobile"
          />
        </div>
        <Socials />
        <div className="dark:text-white">
          <CollectionItems />
        </div>
      </>
    );
  };

  return (
    <div className="px-4 sm:px-5 flex flex-col gap-4 dark:text-txt-gray">
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
      <Content />
    </div>
  );
};

export default CollectionCardPage;
