"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageComponent, Icon, Button, Tabs } from "@/components";
import Description from "@/components/ui/Description";
import {
  Properties,
  TradingHistory,
  AuctionBidModal,
  ConnectWalletModal,
} from "@/features/nft";

const description =
  "Lorem Ipsum is simply dummy text of the printing and typesetting typesetting text typesetting industry dummy text of the printing and typesetting typesetting text typesetting industry";

const Info = () => <h1>Info</h1>;

const properties = {
  Editions: 17,
  Owned: 0,
  Royalties: "2.02%",
  Minted: "Jul 17, 2023",
  "Token ID": (
    <span className="flex gap-1 items-center">
      <Icon name="arrowRightUp" />
      #829006
    </span>
  ),
  Metadata: (
    <span className="flex gap-1 items-center">
      <Icon name="arrowRightUp" />
      IPFS
    </span>
  ),
  Contract: (
    <span className="flex gap-1 items-center">
      <Icon name="arrowRightUp" />
      KT1RJ...dxton
    </span>
  ),
};

const tabsConfig = [
  { label: "Properties", component: () => <Properties data={properties} /> },
  { label: "Info", component: Info },
  { label: "Trading history", component: TradingHistory },
];
export default function Auction() {
  const [bidModal, showBidModal] = useState(false);
  const router = useRouter();
  return (
    <div className="px-4">
      <div className="md:grid grid-cols-2 gap-7">
        <div className="border rounded-2xl border-stroke-gray dark:border-dark-gray relative">
          <div className="p-2.5 sm:p-5">
            <ImageComponent
              src="/mockAssets/3.png"
              className="w-full h-full  object-cover rounded-2xl"
            />
          </div>
          <span className="w-8 h-8 rounded-lg bg-stroke-gray/50 absolute top-6 sm:top-10 right-6 sm:right-10 flex items-center justify-center ">
            <Icon name="zoomin" />
          </span>
        </div>
        <div>
          <div className="flex flex-col gap-3.5 pt-6">
            <div className="flex items-center gap-1.5">
              <span onClick={() => router.back()}>
                <Icon name="arrowLeft" />
              </span>
              <p>AlexByArchitecture</p>
            </div>
            <div className="text-2xl font-bold">Architecture Home #59</div>
            <div className="flex justify-between">
              <div className="flex gap-1">
                <span className="text-txt-gray">Owned by</span>
                <span className="font-bold">0x7091…d4Ce</span>
              </div>
              <div className="flex gap-1 py-px px-2 border rounded-xl border-stroke-gray dark:border-dark-gray items-center dark:bg-dark">
                <span>
                  <Icon name="eye" />
                </span>
                <span className="font-semibold dark:text-light-silver">
                  243
                </span>
              </div>
            </div>
            <div>
              <Description value={description} className="leading-6" />
            </div>
          </div>

          <div className="border-t border-stroke-gray dark:border-dark-gray">
            <div className="flex justify-between text-sm dark:text-light-silver py-6">
              <div className="flex gap-3.5 font-semibold">
                <div className="dark:bg-dark flex gap-1 items-center justify-center px-1.5 py-1 border rounded-2xl border-stroke-gray dark:border-dark-gray md:cursor-pointer ">
                  <Icon name="heart" />
                  <span>10</span>
                </div>
                <div className="dark:bg-dark flex gap-1 items-center justify-center px-1.5 py-2 border rounded-2xl border-stroke-gray dark:border-dark-gray md:cursor-pointer">
                  <Icon name="refresh" />
                  <span>Refresh</span>
                </div>
                <div className="dark:bg-dark flex gap-1 items-center justify-center px-1.5 py-2 border rounded-2xl border-stroke-gray dark:border-dark-gray md:cursor-pointer">
                  <Icon name="share" />
                  <span>Share</span>
                </div>
              </div>
              <div className="dark:bg-dark flex items-center justify-center px-3 border rounded-2xl border-stroke-gray dark:border-dark-gray md:cursor-pointer">
                <Icon name="dots" />
              </div>
            </div>
            <div className="border rounded-xl border-stroke-gray dark:border-dark-gray p-2.5 flex flex-col gap-3.5 sm:border-none">
              <div className="flex flex-col gap-3.5 sm:flex-row gap-1 sm:border rounded-xl border-stroke-gray dark:border-dark-gray p-1.5">
                <div className="border dark:border-none rounded-xl bg-button-gray dark:bg-dark flex flex-col gap-2 p-2.5 sm:w-full">
                  <p className="text-txt-gray">Auction ends in</p>
                  <p className="text-2xl font-bold flex gap-2">
                    <span>{27}</span>:<span>{"08"}</span>:<span>{46}</span>
                  </p>
                  <p className="text-txt-gray flex gap-7">
                    <span>hrs</span>
                    <span>min</span>
                    <span>sec</span>
                  </p>
                </div>
                <div className="flex gap-1 justify-center sm:w-full sm:border sm:dark:border-none rounded-xl sm:bg-button-gray dark:bg-dark flex sm:flex-col gap-2 sm:p-2.5">
                  <p className="sm:text-txt-gray">Minimum bid</p>
                  <p className="font-bold sm:text-2xl">2.8 ASTR</p>
                  <p className="hidden sm:block text-txt-gray">2.8 ASTR</p>
                </div>
              </div>
              <div className="flex">
                <Button
                  onClick={() => showBidModal(true)}
                  color="black"
                  title={
                    <span className="flex items-center justify-center gap-1">
                      <Icon name="hummer" /> Bid
                    </span>
                  }
                  className="rounded-2xl w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-8">
        <Tabs
          config={tabsConfig}
          initialTab="Properties"
          className="mx-0"
          listContainerClass="md:border-none"
        />
      </div>
      {bidModal && <AuctionBidModal onClose={() => showBidModal(false)} />}
    </div>
  );
}
