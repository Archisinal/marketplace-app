"use client";
import React from "react";
import Head from "next/head";
import { useMediaQuery } from "react-responsive";
import {
  SliderComponent,
  ActionTile,
  CategoryCard,
  AuctionCard,
  CollectionCard,
  Button,
  InputSearch,
  LinksTile,
  ItemCard,
  Banner,
} from "../components";
import Icon from "../icons";
import { RESOLUTION_QUERY, getCurrentScreen } from "@/utils/resolutionScreens";

// Mock Data
import { cardData } from "../data/cardItems";
import { actions } from "../data/actions";
import { categories } from "../data/categoryItems";
import { auctionData } from "../data/auctionItems";
import { marketPlace, links, joinUs } from "../data/linksData";

export default function Home() {
  const isTablet = useMediaQuery(RESOLUTION_QUERY.TABLET);
  const isDesktop = useMediaQuery(RESOLUTION_QUERY.DESKTOP);

  return (
    <>
      <div className="flex justify-center mt-10 bg-tablet-dark dark:bg-tablet-dark md:bg-desktop-light md:dark:bg-desktop-dark bg-no-repeat bg-120 bg-50-100">
        <Head>
          <title>marketplace-app.com</title>
          <meta
            name="description"
            content="NFT Market - Market where you can buy and sell new NFTs."
          />
        </Head>
        {/* Top Banner  */}
        <div className=" w-full minmd:w-4/5 px-6 container mx-auto   ">
          <Banner />
        </div>
      </div>
      {/* Items carousel */}
      <div className="px-8 container xlg:max-w-none">
        <SliderComponent
          data={cardData}
          Component={ItemCard}
          sliderContainerClass="border dark:bg-dark dark:border-none border-stroke-grey rounded-20 p-4"
          showDots={false}
        />
      </div>
      {/* Create and Sell block */}
      <div className="px-8 mt-12 sm:mt-24 container ">
        <p className="text-2xl font-bold sm:text-3xl md:text-40 mb-12">
          Create & Sell Digital Inscriptions
        </p>
        <div className=" grid grid-cols-1  sm:grid-cols-2 md:grid-cols-4 gap-6">
          {actions.map((action, index) => (
            <ActionTile {...action} key={index} />
          ))}
        </div>
      </div>
      {/* Category block */}
      <div className="px-8  mt-12 sm:mt-24 select-none  ">
        <p className="text-2xl font-bold sm:text-3xl md:text-4xl mb-12">
          Browse by Category
        </p>
        <div>
          <SliderComponent
            data={categories}
            Component={CategoryCard}
            sliderContainerClass="border dark:bg-dark dark:border-none border-stroke-grey rounded-20 p-4"
            options={{
              itemClass: "!w-36 sm:!w-60 xlg:!w-64",
              arrows: false,
              centerMode: true,
              containerClass: "md:justify-center p-1",
            }}
            showDots={false}
          />
        </div>
      </div>
      {/* Auctions block */}
      <div className="pl-8 sm:pr-6 mt-12 sm:mt-24">
        <p className="text-2xl font-bold sm:text-3xl md:text-40 mb-12">
          Hot auctions
        </p>
        <div>
          <SliderComponent
            data={auctionData}
            Component={AuctionCard}
            sliderContainerClass="border dark:bg-dark dark:border-none border-stroke-grey rounded-20 p-4"
            options={{
              showDots: false,
              itemClass: "!w-60 sm:!w-84",
              arrows: isTablet,
              centerMode: true,
            }}
          />
        </div>
        <div className="pr-6 mt-5 text-center">
          <Button
            title="View auctions house"
            color="transparent"
            className="w-full sm:w-fit sm:font-18px font-semibold rounded-2xl"
          />
        </div>
      </div>
      {/* Collections block */}
      <div className="pl-8 sm:pr-6 mt-12 sm:24">
        <p className="text-2xl font-bold sm:text-3xl md:text-40 mb-12">
          Top collections
        </p>
        <div>
          <SliderComponent
            data={auctionData}
            Component={CollectionCard}
            sliderContainerClass="border dark:bg-dark dark:border-none border-stroke-grey rounded-20 p-4"
            options={{
              showDots: false,
              itemClass: "!w-60 sm:!w-84",
              arrows: isTablet,
              centerMode: true,
            }}
          />
        </div>
        <div className="pr-6 mt-5 text-center">
          <Button
            title="View all collections"
            color="transparent"
            className="w-full sm:w-fit sm:font-18px font-semibold rounded-2xl"
          />
        </div>
      </div>
      {/* Footer block */}
      <div className="flex flex-col gap-2 sm:mx-7 md:flex-row-reverse sm:gap-10 mt-20  justify-center">
        {/* Stay in the loop */}
        <div className="pl-4 sm:pl-0 sm:pr-6 sm:24 mr-4 md:pl-4 md:border-l border-white-smoke dark:border-none md:max-w-md">
          <p className="text-2xl font-bold sm:text-3xl mb-7 md:mb-2">
            Stay in the loop
          </p>
          {isDesktop && (
            <div className="text-dim-gray mb-7">
              Join our mailing list to stay in the loop with our newest feature
              releases, NFT drops, and tips and tricks for navigating OpenSea.
            </div>
          )}
          <InputSearch
            placeholder="Your email"
            suffix={<Icon name="arrowRight" />}
            styles="rounded-lg"
          />
        </div>
        {/* -- Fotter Links */}
        <div className="grid grid-cols-2 sm:grid-cols-footer-links md:flex shrink gap-8 mx-4 sm:mx-0 pl-1.5">
          <div className=" dark:border-none md:border-l border-white-smoke md:pl-4">
            <LinksTile title="Marketplace" linksConfig={marketPlace} />
          </div>
          <div className="sm:border-l border-white-smoke dark:border-none sm:pl-4">
            <LinksTile title="Links" linksConfig={links} />
          </div>
          <div className="sm:border-l border-white-smoke dark:border-none sm:pl-4">
            <LinksTile title="Join us" linksConfig={joinUs} />
          </div>
        </div>
        {/* -- Footer Logo */}
        {isDesktop && (
          <div className="flex flex-col gap-7 ">
            <div className="text-2xl flex gap-5 font-semi-bold">
              <Icon name="logo" width="47" height="47" />
              <span>Archisinal</span>
            </div>
            <div className="text-txt-gray md:w-64 lg:w-82 md:text-sm lg:text-base">
              The world's largest digital trading platform for collectible
              cryptocurrencies and non-functioning tokens (NFTs). Buy, sell and
              discover exclusive digital items.
            </div>
          </div>
        )}
      </div>
    </>
  );
}
